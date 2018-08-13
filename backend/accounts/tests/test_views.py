from django.urls import reverse
from faker import Faker
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import User


class RegistrationTestCase(APITestCase):

    def setUp(self):
        self.faker = Faker()

    def test_valid_submit_created(self):
        password = self.faker.password(length=9, digits=True)
        data = {'email': self.faker.email(), 'password': password}

        response = self.client.post(reverse('accounts:register'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().email, data['email'])

    def test_registration_view_invalid_submit(self):
        response = self.client.post(reverse('accounts:register'))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

