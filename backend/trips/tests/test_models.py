from django.test import TestCase
from faker import Faker

from .factories import TripFactory, TripLocationFactory, TripLocationItemFactory


class TripTestCase(TestCase):

    def setUp(self):
        self.faker = Faker()
        self.trip = TripFactory.create()

    def test_get_locations(self):
        location = TripLocationFactory.create(trip=self.trip)
        self.assertEqual(self.trip.locations.get(), location)


class TripLocationTestCase(TestCase):

    def setUp(self):
        self.faker = Faker()
        self.location = TripLocationFactory.create()

    def test_get_items(self):
        item = TripLocationItemFactory.create(location=self.location,order=1)
        self.assertEqual(self.location.items.get(), item)