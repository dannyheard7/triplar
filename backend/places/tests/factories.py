import factory
from faker import Factory

from places.models import APIPlace

faker = Factory.create()


class APIPlaceFactory:
    id = faker.text(max_nb_chars=10)
    name = faker.first_name()
    category = faker.city()
    coordinates = {"latitude": faker.latitude(), "longitude": faker.longitude()}
    address = faker.address()
    image_url = faker.url()

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'selectedCategory': self.category, 'coordinates': self.coordinates,
                'location': {'display_address': self.address}, 'image_url': self.image_url}


class APIPlaceModelFactory(factory.DjangoModelFactory):
    class Meta:
        model = APIPlace

    yelp_api_id = faker.text(max_nb_chars=10)
