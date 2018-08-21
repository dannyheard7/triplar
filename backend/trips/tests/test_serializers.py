from unittest import TestCase

from faker import Faker
from rest_framework.exceptions import ErrorDetail

from cities.tests.factories import CityFactory
from trips.serializers import TripListSerializer, CityItinerarySerializer, TripDetailSerializer
from .factories import TripFactory, CityItineraryFactory

faker = Faker()


class TripListSerializerTest(TestCase):
    def setUp(self):
        self.trip = TripFactory()

        self.data = {
            'name': self.trip.name,
            'start_date': self.trip.start_date,
            'end_date': self.trip.end_date,
            'created_by': self.trip.created_by.id
        }

    def test_create_valid(self):
        serializer = TripListSerializer(data=self.data)
        self.assertTrue(serializer.is_valid())

    def test_empty_start_date(self):
        self.data['start_date'] = None

        serializer = TripListSerializer(data=self.data)
        is_valid = serializer.is_valid()

        expected_error = {
            'start_date': [ErrorDetail(string='This field may not be null.', code='null')]
        }

        self.assertFalse(is_valid)
        self.assertEqual(serializer.errors, expected_error)

    def test_empty_end_date(self):
        self.data['end_date'] = None

        serializer = TripListSerializer(data=self.data)
        is_valid = serializer.is_valid()

        expected_error = {
            'end_date': [ErrorDetail(string='This field may not be null.', code='null')]
        }

        self.assertFalse(is_valid)
        self.assertEqual(serializer.errors, expected_error)

    def test_locations_ordered_by_start_date(self):
        city = CityFactory(name_std=faker.city())
        city2 = CityFactory(name_std=faker.city())

        CityItineraryFactory.create(trip=self.trip, start_date=faker.past_date(), city=city)
        CityItineraryFactory.create(trip=self.trip, start_date=faker.future_date(), city=city2)

        serializer = TripListSerializer()
        self.assertEqual(serializer.get_locations(self.trip), [city.name_std, city2.name_std])


class TripDetailSerializerTest(TestCase):
    def setUp(self):
        self.trip = TripFactory()

        self.data = {
            'name': self.trip.name,
            'start_date': self.trip.start_date,
            'end_date': self.trip.end_date,
            'created_by': self.trip.created_by.id
        }

    def test_create_valid(self):
        serializer = TripDetailSerializer(data=self.data)
        self.assertTrue(serializer.is_valid())

    def test_itineraries_ordered_by_start_date(self):
        itinerary = CityItineraryFactory.create(trip=self.trip, start_date=faker.past_date())
        itinerary2 = CityItineraryFactory.create(trip=self.trip, start_date=faker.future_date())

        itinerary_serializer = CityItinerarySerializer(instance=itinerary)
        itinerary2_serializer = CityItinerarySerializer(instance=itinerary2)

        serializer = TripDetailSerializer()
        self.assertEqual(serializer.get_itineraries(self.trip), [itinerary_serializer.data, itinerary2_serializer.data])
        self.assertNotEqual(serializer.get_itineraries(self.trip), [itinerary2_serializer.data, itinerary_serializer.data])


class CityItinerarySerializerTest(TestCase):
    def setUp(self):
        self.city_itinerary = CityItineraryFactory()
        city = self.city_itinerary.city

        self.data = {
            'start_date': self.city_itinerary.start_date,
            'end_date': self.city_itinerary.end_date,
            'city': city.name_std + ", " + city.country.name
        }

    def test_create_valid(self):
        serializer = CityItinerarySerializer(data=self.data)
        self.assertTrue(serializer.is_valid())

    def test_non_entire_city_name_returns_error(self):
        self.data['city'] = self.city_itinerary.city.name_std[:-1]

        serializer = CityItinerarySerializer(data=self.data)
        is_valid = serializer.is_valid()

        expected_error = {
            'city': [ErrorDetail(string='Location not found', code='invalid')]
        }

        self.assertFalse(is_valid)
        self.assertEqual(serializer.errors, expected_error)


