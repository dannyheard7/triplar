from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.tests.factories import UserFactory
from cities.tests.factories import CityFactory
from trips.models import Trip

from faker import Factory
faker = Factory.create()


class TripListViewTestCase(APITestCase):

    def setUp(self):
        city = CityFactory()
        self.user = UserFactory()
        self.client.force_authenticate(self.user)

        self.data = {
            'name': faker.word(ext_word_list=None),
            'start_date': faker.date(),
            'end_date': faker.date(),
            'locations': [city.name_std + ", " + city.country.name]
        }

    def test_valid_submit_created(self):
        response = self.client.post(reverse('trips:trip-list'), self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Trip.objects.count(), 1)
        self.assertEqual(Trip.objects.get().name, self.data['name'])

    def test_created_by_is_set_as_request_user(self):
        response = self.client.post(reverse('trips:trip-list'), self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Trip.objects.get().created_by, self.user)
