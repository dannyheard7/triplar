import graphene
from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene_django.forms.types import ErrorType
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required
from django.db.models import Q

from places.schema import PlaceType
from places.yelp import PlacesAPI
from .forms import TripForm, TripLocationForm, TripLocationItemForm
from .models import Trip, TripLocation, TripLocationItem


class TripType(DjangoObjectType):
    class Meta:
        model = Trip


class TripLocationType(DjangoObjectType):
    class Meta:
        model = TripLocation


class TripLocationItemType(DjangoObjectType):
    class Meta:
        model = TripLocationItem

    place = graphene.Field(PlaceType)

    def resolve_place(self, context, **kwargs):
        return PlacesAPI.get_place_detail(self.api_place.yelp_api_id)


class Query(graphene.ObjectType):
    trip = graphene.Field(TripType, id=graphene.Int())
    trips = graphene.List(TripType)

    location = graphene.Field(TripLocationType, id=graphene.Int())
    locations = graphene.List(TripLocationType)

    location_day_itinerary = graphene.List(TripLocationItemType, date=graphene.Date(), location_id=graphene.Int())

    @login_required
    def resolve_trips(self, info):
        return Trip.objects.filter(created_by=info.context.user).order_by('start_date')

    @login_required
    def resolve_trip(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return Trip.objects.get(pk=id, created_by=info.context.user)

        return None

    @login_required
    def resolve_locations(self, info):
        return TripLocation.objects.filter(trip__created_by=info.context.user).order_by('start_date')

    @login_required
    def resolve_location(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return TripLocation.objects.get(pk=id, trip__created_by=info.context.user)

        return None

    @login_required
    def resolve_location_day_itinerary(self, info, **kwargs):
        date = kwargs.get('date')
        location_id = kwargs.get('location_id')

        if date is not None and location_id is not None:
            return TripLocationItem.objects.filter(Q(start_date=date) | Q(end_date=date), location=location_id,
                                                   location__trip__created_by=info.context.user).order_by('order')

        return None


class TripMutation(DjangoModelFormMutation):
    class Meta:
        form_class = TripForm

    @classmethod
    def perform_mutate(cls, form, info):
        if not info.context.user.is_authenticated:
            return cls(errors=[ErrorType(field="user", messages=["User is not authenticated"])])

        obj = form.save(commit=False)
        obj.created_by = info.context.user
        obj.save()

        kwargs = {cls._meta.return_field_name: obj}
        return cls(errors=[], **kwargs)


class DeleteTrip(graphene.Mutation):
    class Arguments:
        id = graphene.Int()

    result = graphene.Boolean()

    @login_required
    def mutate(self, info, id):
        trip = Trip.objects.get(pk=id, created_by=info.context.user)
        trip.delete()
        return DeleteTrip(result=True)


class TripLocationMutation(DjangoModelFormMutation):
    class Meta:
        form_class = TripLocationForm


class AddTripLocationItemMutation(DjangoModelFormMutation):
    class Meta:
        form_class = TripLocationItemForm


class Mutations(graphene.ObjectType):
    create_trip = TripMutation.Field()
    edit_trip = TripMutation.Field()
    delete_trip = DeleteTrip.Field()
    add_trip_location = TripLocationMutation.Field()
    add_trip_location_item = AddTripLocationItemMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)