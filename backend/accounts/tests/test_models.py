from django.test import TestCase
from faker import Faker

from accounts.models import User


class UserTestCase(TestCase):

    def setUp(self):
        self.faker = Faker()

        self.user = User()

    def test_get_full_name(self):
        first_name = self.faker.name()
        last_name = self.faker.name()

        self.user.first_name = first_name
        self.user.last_name = last_name

        self.assertEquals("{} {}".format(first_name, last_name), self.user.get_full_name())

    def test_get_short_name(self):
        first_name = self.faker.name()
        self.user.first_name = first_name

        self.assertEquals(first_name, self.user.get_short_name())

    def test_admin_are_staff(self):
        self.user.is_admin = True
        self.assertTrue(self.user.is_staff)

    def test_non_admin_are_not_staff(self):
        self.user.is_admin = False
        self.assertFalse(self.user.is_staff)
