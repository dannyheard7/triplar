from unittest.mock import MagicMock, patch

from django.test import TestCase
from faker import Faker

from accounts.managers import UserManager


class UserManagerTestCase(TestCase):

    def setUp(self):
        self.faker = Faker()

        self.user_manager = UserManager()
        self.user_mock = MagicMock()
        self.user_manager.model = self.user_mock

    def test_create_user_correct_email(self):
        fake_email = self.faker.email()

        self.user_manager.create_user(email=fake_email, password=self.faker.password(length=9))
        self.user_mock.assert_called_once_with(email=fake_email)

    def test_create_user_correct_password(self):
        fake_password = self.faker.password(length=9)

        self.user_manager.create_user(email=self.faker.email(), password=fake_password)
        self.user_mock.return_value.set_password.assert_called_once_with(fake_password)

    # Assumes tests isn't using a database
    def test_create_user_save_called(self):
        self.user_manager.create_user(email=self.faker.email(), password=self.faker.password(length=9))
        self.user_mock.return_value.save.assert_called_once_with(using=None)

    def test_cant_create_user_without_email(self):
        with self.assertRaisesMessage(ValueError, 'The given email must be set'):
            self.user_manager.create_user(email=None, password=self.faker.password(length=9))

    @patch('accounts.managers.UserManager.create_user')
    def test_create_superuser_calls_create_user(self, create_user):
        fake_email = self.faker.email()
        fake_password = self.faker.password(length=9)

        self.user_manager.create_superuser(email=fake_email, password=fake_password)
        create_user.assert_called_once_with(email=fake_email, password=fake_password)

    @patch('accounts.managers.UserManager.create_user')
    def test_create_superuser_sets_admin(self, create_user):
        create_user.return_value = self.user_mock

        self.user_manager.create_superuser(email=self.faker.email(),
                                           password=self.faker.password(length=9))
        self.assertTrue(self.user_mock.is_admin)

    @patch('accounts.managers.UserManager.create_user')
    def test_create_superuser_sets_superuser(self, create_user):
        create_user.return_value = self.user_mock

        self.user_manager.create_superuser(email=self.faker.email(),
                                           password=self.faker.password(length=9))
        self.assertTrue(self.user_mock.is_superuser)

    # Assumes tests isn't using a database
    @patch('accounts.managers.UserManager.create_user')
    def test_create_superuser_save_called(self, create_user):
        create_user.return_value = self.user_mock

        self.user_manager.create_superuser(email=self.faker.email(),
                                           password=self.faker.password(length=9))
        self.user_mock.save.assert_called_once_with(using=None)