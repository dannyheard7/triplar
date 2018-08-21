from unittest.mock import patch

import graphene
from django.test import RequestFactory
from faker import Factory
from graphene.test import Client
from snapshottest.django import TestCase

import places.schema
from accounts.tests.factories import UserFactory

faker = Factory.create()


@patch("places.yelp.PlacesAPI.get_popular_places", return_value=[])
class PopularPlacesListViewTestCase(TestCase):
    def setUp(self):
        self.schema = graphene.Schema(query=places.schema.Query)
        self.client = Client(self.schema)
        self.lat = faker.latitude()
        self.lng = faker.longitude()

    def test_non_authenticated_users_can_access_view(self, get_popular_places):
        get_places_query = """ query {{ 
            popularPlaces(lat: {}, lng: {}) {{
                id
                name
                imageUrl
            }}
        }} """

        get_places_query = get_places_query.format(self.lat, self.lng)
        response = self.client.execute(get_places_query)
        self.assertTrue('data' in response)

    def test_authenticated_users_can_access_view(self, get_popular_places):
        user = UserFactory()
        request = RequestFactory().get('/')
        request.user = user
        client = Client(self.schema, context_value=request)

        get_places_query = """ query {{ 
            popularPlaces(lat: {}, lng: {}) {{
                id
                name
                imageUrl
            }}
        }} """

        get_places_query = get_places_query.format(self.lat, self.lng)
        response = client.execute(get_places_query)
        self.assertTrue('data' in response)

    def test_missing_location_raises_error(self, get_popular_places):
        get_places_query = """ query {
                    popularPlaces() {
                        id
                        name
                        imageUrl
                    }
                } """

        response = self.client.execute(get_places_query)
        self.assertTrue('errors' in response)

    def test_returns_serialized_places(self, get_popular_places):
        place1 = {'id': 1, 'name': "Place 1", 'image_url': "example.com"}
        place2 = {'id': 2, 'name': "Place 2", 'image_url': "example.com"}

        get_popular_places.return_value = [place1, place2]

        get_places_query = """ query {{ 
                    popularPlaces(lat: {}, lng: {}) {{
                        id
                        name
                        imageUrl
                    }}
                }} """

        get_places_query = get_places_query.format(self.lat, self.lng)

        response = self.client.execute(get_places_query)
        self.assertEqual(len(response['data']['popularPlaces']), 2)
        self.assertMatchSnapshot(response)


@patch("places.yelp.PlacesAPI.search_nearby_places", return_value=[])
class PlacesNameSearchTestCase(TestCase):
    def setUp(self):
        self.schema = graphene.Schema(query=places.schema.Query)
        self.client = Client(self.schema)
        self.lat = faker.latitude()
        self.lng = faker.longitude()

    def test_non_authenticated_users_can_access_view(self, search_nearby_places):
        get_places_query = """ query {{ 
            places(lat: {}, lng: {}, name: \"{}\") {{
                id
                name
                imageUrl
            }}
        }} """

        get_places_query = get_places_query.format(self.lat, self.lng, "Place")
        response = self.client.execute(get_places_query)
        self.assertTrue('data' in response)

    def test_authenticated_users_can_access_view(self, search_nearby_places):
        user = UserFactory()
        request = RequestFactory().get('/')
        request.user = user
        client = Client(self.schema, context_value=request)

        get_places_query = """ query {{ 
            places(lat: {}, lng: {}, name: \"{}\") {{
                id
                name
                imageUrl
            }}
        }} """

        get_places_query = get_places_query.format(self.lat, self.lng, "Place")
        response = client.execute(get_places_query)
        self.assertTrue('data' in response)

    def test_missing_location_raises_error(self, search_nearby_places):
        get_places_query = """ query {{ 
                    places(lat: {}, lng: {}, name: \"{}\") {{
                        id
                        name
                        imageUrl
                    }}
                }} """
        response = self.client.execute(get_places_query)
        self.assertTrue('errors' in response)

    def test_missing_name_raises_error(self, search_nearby_places):
        get_places_query = """ query {{ 
            places(lat: {}, lng: {}) {{
                id
                name
                imageUrl
            }}
        }} """

        get_places_query = get_places_query.format(self.lat, self.lng)
        response = self.client.execute(get_places_query)
        self.assertTrue('errors' in response)

    def test_returns_serialized_places(self, search_nearby_places):
        place1 = {'id': 1, 'name': "Place 1", 'image_url': "example.com"}
        place2 = {'id': 2, 'name': "Place 2", 'image_url': "example.com"}
        search_nearby_places.return_value = [place1, place2]

        get_places_query = """ query {{ 
                    places(lat: {}, lng: {}, name: \"{}\") {{
                        id
                        name
                        imageUrl
                    }}
                }} """

        get_places_query = get_places_query.format(self.lat, self.lng, "Place")

        response = self.client.execute(get_places_query)
        self.assertEqual(len(response['data']['places']), 2)
        self.assertMatchSnapshot(response)
