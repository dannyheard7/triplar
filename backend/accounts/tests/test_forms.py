from unittest import TestCase

from faker import Faker

from accounts.forms import UserForm


class UserFormTest(TestCase):
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

        form = UserForm(data=self.data)

        expected_error = {
            'email': ['This field is required.']
        }

        self.assertFalse(form.is_valid())
        self.assertEqual(form.errors, expected_error)

    def test_empty_password(self):
        self.data['password'] = ''

        form = UserForm(data=self.data)

        expected_error = {
            'password': ['This field is required.']
        }

        self.assertFalse(form.is_valid())
        self.assertEqual(form.errors, expected_error)

    def test_create_valid(self):
        form = UserForm(data=self.data)
        self.assertTrue(form.is_valid())

    def test_create_extra_fields_valid(self):
        self.data['first_name'] = self.faker.name()
        self.data['last_name'] = self.faker.name()

        form = UserForm(data=self.data)
        self.assertTrue(form.is_valid())
