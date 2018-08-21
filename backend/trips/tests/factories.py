import factory
from faker import Factory

from accounts.tests.factories import UserFactory
from cities.tests.factories import CityFactory
from trips.models import Trip, CityItinerary, ItineraryItem

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


class CityItineraryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = CityItinerary

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


class ItineraryItemFactory(factory.DjangoModelFactory):
    class Meta:
        model = ItineraryItem

    start = faker.date_time()
    end = faker.date_time()
    itinerary = factory.SubFactory(CityItineraryFactory)