from django.test import TestCase
from faker import Faker

from .factories import TripFactory, CityItineraryFactory, ItineraryItemFactory


class TripTestCase(TestCase):

    def setUp(self):
        self.faker = Faker()
        self.trip = TripFactory.create()

    def test_get_itineraries(self):
        itinerary = CityItineraryFactory.create(trip=self.trip)
        self.assertEqual(self.trip.itineraries.get(), itinerary)


class CityItineraryTestCase(TestCase):

    def setUp(self):
        self.faker = Faker()
        self.city_itinerary = CityItineraryFactory.create()

    def test_get_items(self):
        item = ItineraryItemFactory.create(itinerary=self.city_itinerary)
        self.assertEqual(self.city_itinerary.items.get(), item)