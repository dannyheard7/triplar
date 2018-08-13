import factory
from django.contrib.gis.geos import Point
from faker import Factory

from cities.models import City, Country

faker = Factory.create()


class CountryFactory(factory.DjangoModelFactory):
    class Meta:
        model = Country
        django_get_or_create = ('code3',)

    code = faker.random_letter() + faker.random_letter()
    code3 = code + faker.random_letter()
    population = faker.random_digit()


class CityFactory(factory.DjangoModelFactory):
    class Meta:
        model = City

    name_std = faker.city()
    population = faker.random_digit()
    country = factory.SubFactory(CountryFactory)
    location = Point(0, 0, srid=32140)