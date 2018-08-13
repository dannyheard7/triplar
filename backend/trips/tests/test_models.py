from django.test import TestCase
from faker import Faker

from cities.tests.factories import CityFactory
from .factories import TripFactory


class TripTestCase(TestCase):

    def setUp(self):
        self.faker = Faker()
        self.trip = TripFactory()

    def test_get_locations(self):
        city = CityFactory()
        self.trip.locations.set([city])
        self.assertEqual(self.trip.locations.get(), city)
