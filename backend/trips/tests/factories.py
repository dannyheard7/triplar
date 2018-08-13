import factory
from faker import Factory

from accounts.tests.factories import UserFactory
from trips.models import Trip

faker = Factory.create()


class TripFactory(factory.DjangoModelFactory):
    class Meta:
        model = Trip

    name = faker.word(ext_word_list=None)
    start_date = faker.date()
    end_date = faker.date()
    created_by = factory.SubFactory(UserFactory)

    @factory.post_generation
    def locations(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for location in extracted:
                self.locations.add(location)