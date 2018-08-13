import factory
from faker import Factory

from accounts.models import User

faker = Factory.create()


class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ('email',)

    first_name = faker.first_name()
    last_name = faker.last_name()
    email = faker.email()