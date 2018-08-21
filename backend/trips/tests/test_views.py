from django.urls import reverse
from faker import Factory
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.tests.factories import UserFactory
from cities.tests.factories import CityFactory
from trips.models import Trip, CityItinerary
from trips.serializers import TripListSerializer
from trips.tests.factories import TripFactory

faker = Factory.create()


class TripListViewTestCase(APITestCase):

    def setUp(self):
        self.user = UserFactory()
        self.client.force_authenticate(self.user)

        self.data = {
            'name': faker.word(ext_word_list=None),
            'start_date': faker.date(),
            'end_date': faker.date()
        }

    def test_returns_trips_created_by_user(self):
        trip1 = TripFactory(created_by=self.user)
        trip2 = TripFactory(created_by=self.user)

        trip1_data = TripListSerializer(instance=trip1).data
        trip2_data = TripListSerializer(instance=trip2).data

        response = self.client.get(reverse('trips:trip-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [trip1_data, trip2_data])

    def test_valid_submit_created(self):
        response = self.client.post(reverse('trips:trip-list'), self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Trip.objects.get().name, self.data['name'])

    def test_created_by_is_set_as_request_user(self):
        response = self.client.post(reverse('trips:trip-list'), self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Trip.objects.get(name=self.data['name']).created_by, self.user)


class TripDetailViewTestCase(APITestCase):

    def setUp(self):
        self.user = UserFactory()
        self.trip = TripFactory()
        self.client.force_authenticate(self.user)

        self.data = {
            'name': faker.word(ext_word_list=None),
            'start_date': faker.date(),
            'end_date': faker.date()
        }

    def test_valid_submit_updated(self):
        self.assertNotEqual(Trip.objects.get(pk=self.trip.id).name, self.data['name'])
        response = self.client.patch(reverse('trips:trip-detail', kwargs={'pk': self.trip.id}), self.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Trip.objects.get(pk=self.trip.id).name, self.data['name'])


class DestinationsListViewTestCase(APITestCase):

    def setUp(self):
        self.user = UserFactory()
        self.trip = TripFactory()
        self.city = CityFactory()
        self.client.force_authenticate(self.user)

        self.data = {
            'start_date': faker.date(),
            'end_date': faker.date(),
            'city': self.city.name_std + ", " + self.city.country.name
        }

    def test_valid_submit_created(self):
        response = self.client.post(reverse('trips:trip-destinations', kwargs={'pk': self.trip.id}), self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        itinerary = CityItinerary.objects.get(start_date=self.data['start_date'], end_date=self.data['end_date'])
        self.assertEqual(self.trip.itineraries.get(), itinerary)
