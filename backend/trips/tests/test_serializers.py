from unittest import TestCase

from faker import Faker
from rest_framework.exceptions import ErrorDetail

from cities.tests.factories import CityFactory
from .factories import TripFactory
from trips.serializers import TripSerializer

faker = Faker()


class TripSerializerTest(TestCase):
    def setUp(self):
        self.trip = TripFactory(locations=[CityFactory()])
        location = self.trip.locations.get()

        self.data = {
            'name': self.trip.name,
            'start_date': self.trip.start_date,
            'end_date': self.trip.end_date,
            'created_by': self.trip.created_by.id,
            'locations': [location.name_std + ", " + location.country.name]
        }

    def test_create_valid(self):
        serializer = TripSerializer(data=self.data)
        self.assertTrue(serializer.is_valid())

    def test_empty_start_date(self):
        self.data['start_date'] = None

        serializer = TripSerializer(data=self.data)
        is_valid = serializer.is_valid()

        expected_error = {
            'start_date': [ErrorDetail(string='This field may not be null.', code='null')]
        }

        self.assertFalse(is_valid)
        self.assertEqual(serializer.errors, expected_error)

    def test_empty_end_date(self):
        self.data['end_date'] = None

        serializer = TripSerializer(data=self.data)
        is_valid = serializer.is_valid()

        expected_error = {
            'end_date': [ErrorDetail(string='This field may not be null.', code='null')]
        }

        self.assertFalse(is_valid)
        self.assertEqual(serializer.errors, expected_error)

    def test_empty_name_valid(self):
        self.skipTest("Not yet implemented")
        self.data['name'] = ''

        serializer = TripSerializer(data=self.data)
        is_valid = serializer.is_valid()

        self.assertTrue(is_valid)

    def test_non_entire_city_name_returns_error(self):
        self.data['locations'] = [self.trip.locations.get().name_std[:-1]]

        serializer = TripSerializer(data=self.data)
        is_valid = serializer.is_valid()

        expected_error = {
            'locations': [ErrorDetail(string='Location not found', code='invalid')]
        }

        self.assertFalse(is_valid)
        self.assertEqual(serializer.errors, expected_error)

