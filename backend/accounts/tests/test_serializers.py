from unittest import TestCase

from faker import Faker

from accounts.serializers import RegisterUserSerializer


class RegisterUserSerializerTest(TestCase):
    def setUp(self):
        self.faker = Faker()
        self.email = self.faker.email()
        self.password = self.faker.password(length=9)

        self.data = {
            'email': self.email,
            'password': self.password
        }

    def test_empty_email(self):
        self.data['email'] = ''

        serializer = RegisterUserSerializer(data=self.data)
        is_valid = serializer.is_valid()

        expected_error = {
            'email': ['This field may not be blank.']
        }

        self.assertFalse(is_valid)
        self.assertEqual(serializer.errors, expected_error)

    def test_empty_password(self):
        self.data['password'] = ''

        serializer = RegisterUserSerializer(data=self.data)
        is_valid = serializer.is_valid()

        expected_error = {
            'password': ['This field may not be blank.']
        }

        self.assertFalse(is_valid)
        self.assertEqual(serializer.errors, expected_error)

    def test_create_valid(self):
        serializer = RegisterUserSerializer(data=self.data)
        is_valid = serializer.is_valid()

        self.assertTrue(is_valid)

    def test_password_not_returned(self):
        serializer = RegisterUserSerializer(data=self.data)
        serializer.is_valid()

        self.assertNotIn('password', serializer.data)

    def test_create_extra_fields_valid(self):
        self.data['first_name'] = self.faker.name()
        self.data['last_name'] = self.faker.name()

        serializer = RegisterUserSerializer(data=self.data)
        is_valid = serializer.is_valid()

        self.assertTrue(is_valid)

        self.data.pop('password')
        self.assertEqual(self.data, serializer.data)
