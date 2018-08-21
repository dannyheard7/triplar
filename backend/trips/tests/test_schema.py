import factory
import graphene
from django.test import RequestFactory
from graphene.test import Client
from snapshottest.django import TestCase

import trips.schema
from accounts.tests.factories import UserFactory
from cities.tests.factories import CityFactory
from places.tests.factories import APIPlaceModelFactory
from trips.models import Trip, TripLocation, TripLocationItem

# def test_trips_ordered_by_start_date(self):
#     city = CityFactory(name_std=faker.city())
#     city2 = CityFactory(name_std=faker.city())
#
#     CityItineraryFactory.create(trip=self.trip, start_date=faker.past_date(), city=city)
#     CityItineraryFactory.create(trip=self.trip, start_date=faker.future_date(), city=city2)
#
#     serializer = TripListSerializer()
#     self.assertEqual(serializer.get_locations(self.trip), [city.name_std, city2.name_std])
#
#
# def test_locations_ordered_by_start_date(self):
#     location = CityItineraryFactory.create(trip=self.trip, start_date=faker.past_date())
#     itinerary2 = CityItineraryFactory.create(trip=self.trip, start_date=faker.future_date())
#
#     itinerary_serializer = CityItinerarySerializer(instance=location)
#     itinerary2_serializer = CityItinerarySerializer(instance=itinerary2)
#
#     serializer = TripDetailSerializer()
#     self.assertEqual(serializer.get_itineraries(self.trip), [itinerary_serializer.data, itinerary2_serializer.data])
#     self.assertNotEqual(serializer.get_itineraries(self.trip), [itinerary2_serializer.data, itinerary_serializer.data])


from .factories import TripFactory, TripLocationFactory, TripLocationItemFactory


class TripSchemaTestCase(TestCase):
    def setUp(self):
        schema = graphene.Schema(query=trips.schema.Query, mutation=trips.schema.Mutations)
        self.user = UserFactory()

        request = RequestFactory().get('/')
        request.user = self.user

        self.client = Client(schema, context_value=request)

        trip = Trip(name="Trip1", start_date="2018-08-20", end_date="2018-09-20", created_by=self.user)
        trip.save()
        city = CityFactory(name="Madrid")
        city.save()
        trip_location = TripLocation(trip=trip, city=city, start_date="2018-08-20", end_date="2018-09-20")
        trip_location.save()

    def test_get_trips(self):
        get_trips_query = """query {
            trips {
                id
                name 
                startDate 
                endDate 
                locations { 
                    startDate 
                    endDate 
                    city { 
                        name 
                    } 
                } 
            }
        }"""

        self.assertMatchSnapshot(self.client.execute(get_trips_query))

    def test_get_trip_detail(self):
        get_trip_detail_query = """query {
            trip(id: 1) { 
                id 
                name 
                startDate 
                endDate 
                locations { 
                    id 
                    startDate 
                    endDate
                    trip {
                        id
                    }
                    city {
                        name
                        location
                        country {
                            name
                        }
                    }
                }
            }
        }"""

        self.assertMatchSnapshot(self.client.execute(get_trip_detail_query))

    def test_create_trip(self):
        create_trip_mutation = """mutation CreateTrip($input: TripMutationInput!){ 
              createTrip(input: $input) { 
                trip { 
                    id 
                } 
                errors { 
                  field 
                  messages 
                } 
              } 
            }"""

        trip = factory.build(dict, FACTORY_CLASS=TripFactory)
        trip['startDate'] = trip.pop('start_date')
        trip['endDate'] = trip.pop('end_date')
        trip.pop('created_by')
        variables = {'input': trip}

        response = self.client.execute(create_trip_mutation, variable_values=variables)
        self.assertMatchSnapshot(response)
        trip_id = response['data']['createTrip']['trip']['id']
        self.assertEqual(Trip.objects.get(pk=trip_id).created_by, self.user)

    def test_add_trip_location(self):
        add_trip_location_mutation = """mutation AddTripLocation($input: TripLocationMutationInput!){ 
          addTripLocation(input: $input) { 
            tripLocation {
                id
                startDate
                endDate
                city {
                    name
                    location
                }
                trip {
                    id
                }
            }
            errors { 
              field 
              messages 
            } 
          } 
        }"""

        location = factory.build(dict, FACTORY_CLASS=TripLocationFactory)
        location['startDate'] = location.pop('start_date')
        location['endDate'] = location.pop('end_date')
        location.pop('city')
        location['city'] = 'Bristol, United Kingdom'
        variables = {'input': location}

        response = self.client.execute(add_trip_location_mutation, variable_values=variables)
        self.assertMatchSnapshot(response)

    def test_add_trip_location_item(self):
        add_trip_location_item_mutation = """mutation AddTripLocationItem($input: AddTripLocationItemMutationInput!){
          addTripLocationItem(input: $input) {
            tripLocationItem {
              id
            }
            errors {
              field
              messages
            }
          }
        }"""

        location = TripLocationFactory.create()
        location_item = TripLocationItemFactory.build(location=location)
        input = {'startDate': location_item.start_date, 'endDate': location_item.end_date,
                 'location': location_item.location.id, 'apiPlace': location_item.api_place.yelp_api_id,
                 'order': location_item.order}

        response = self.client.execute(add_trip_location_item_mutation, variable_values={'input': input})
        self.assertMatchSnapshot(response)
        location_item_id = response['data']['addTripLocationItem']['tripLocationItem']['id']
        self.assertNotEqual(TripLocationItem.objects.get(pk=location_item_id), None)

    def test_delete_trip(self):
        self.assertEqual(Trip.objects.filter(pk=1).count(), 1) # Sanity Check

        delete_trip_mutation = """mutation DeleteTrip{ 
              deleteTrip(id: 1) { 
                result
              } 
            }"""

        response = self.client.execute(delete_trip_mutation)
        self.assertMatchSnapshot(response)
        self.assertEqual(Trip.objects.filter(pk=1).count(), 0)