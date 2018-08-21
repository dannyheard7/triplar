import factory
from faker import Factory

from accounts.tests.factories import UserFactory
from cities.tests.factories import CityFactory
from places.tests.factories import APIPlaceModelFactory
from trips.models import Trip, TripLocation, TripLocationItem

faker = Factory.create()


class TripFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Trip

    name = faker.word(ext_word_list=None)
    start_date = faker.date()
    end_date = faker.date()
    created_by = factory.SubFactory(UserFactory)

    @factory.post_generation
    def itineraries(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for itinerary in extracted:
                self.itineraries.add(itinerary)


class TripLocationFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = TripLocation

    start_date = faker.date()
    end_date = faker.date()
    city = factory.SubFactory(CityFactory)
    trip = factory.SubFactory(TripFactory)

    @factory.post_generation
    def items(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for item in extracted:
                self.items.add(item)


class TripLocationItemFactory(factory.DjangoModelFactory):
    class Meta:
        model = TripLocationItem

    start_date = faker.date()
    end_date = faker.date()
    start_time = faker.time()
    end_time = faker.time()
    order = faker.random_int()
    location = factory.SubFactory(TripLocationFactory)
    api_place = factory.SubFactory(APIPlaceModelFactory)