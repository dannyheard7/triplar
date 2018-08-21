from unittest import TestCase

from faker import Faker
from rest_framework.exceptions import ErrorDetail

from trips.forms import TripForm, TripLocationForm
from .factories import TripFactory, TripLocationFactory

faker = Faker()


class TripFormTest(TestCase):
    def setUp(self):
        self.trip = TripFactory()

        self.data = {
            'name': self.trip.name,
            'start_date': self.trip.start_date,
            'end_date': self.trip.end_date,
            'created_by': self.trip.created_by.id
        }

    def test_create_valid(self):
        serializer = TripForm(data=self.data)
        self.assertTrue(serializer.is_valid())

    def test_empty_start_date(self):
        self.data['start_date'] = None

        serializer = TripForm(data=self.data)
        is_valid = serializer.is_valid()

        expected_error = {
            'start_date': ['This field is required.']
        }

        self.assertFalse(is_valid)
        self.assertEqual(serializer.errors, expected_error)

    def test_empty_end_date(self):
        self.data['end_date'] = None

        serializer = TripForm(data=self.data)
        is_valid = serializer.is_valid()

        expected_error = {
            'end_date': ['This field is required.']
        }

        self.assertFalse(is_valid)
        self.assertEqual(serializer.errors, expected_error)


class TripLocationFormTest(TestCase):
    def setUp(self):
        self.city_itinerary = TripLocationFactory()
        city = self.city_itinerary.city

        self.data = {
            'trip': self.city_itinerary.trip.id,
            'start_date': self.city_itinerary.start_date,
            'end_date': self.city_itinerary.end_date,
            'city': city.name_std + ", " + city.country.name
        }

    def test_create_valid(self):
        serializer = TripLocationForm(data=self.data)
        self.assertTrue(serializer.is_valid())

    def test_non_entire_city_name_returns_error(self):
        self.data['city'] = self.city_itinerary.city.name_std[:-1]

        serializer = TripLocationForm(data=self.data)
        is_valid = serializer.is_valid()

        expected_error = {
            'city': ['Incorrect Location']
        }

        self.assertFalse(is_valid)
        self.assertEqual(serializer.errors, expected_error)


