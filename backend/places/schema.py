import graphene
from django.core.exceptions import FieldError
from graphene.types.resolver import dict_resolver

from .yelp import PlacesAPI, Categories


class CategoryType(graphene.ObjectType):
    class Meta:
        default_resolver = dict_resolver

    alias = graphene.String()
    title = graphene.String()


class PlaceType(graphene.ObjectType):
    class Meta:
        default_resolver = dict_resolver

    class LocationType(graphene.ObjectType):
        class Meta:
            default_resolver = dict_resolver

        address1 = graphene.String()
        address2 = graphene.String()
        address3 = graphene.String()
        city = graphene.String()
        zip_code = graphene.String()
        country = graphene.String()
        state = graphene.String()
        display_address = graphene.String()

        @classmethod
        def resolve_display_address(cls, info, _):
            return ",".join(info['display_address'])

    class CoordinatesType(graphene.ObjectType):
        class Meta:
            default_resolver = dict_resolver

        latitude = graphene.Float()
        longitude = graphene.Float()

    class HoursType(graphene.ObjectType):
        class Meta:
            default_resolver = dict_resolver

        class OpenType(graphene.ObjectType):
            class Meta:
                default_resolver = dict_resolver

            is_overnight = graphene.Boolean
            day = graphene.Int()
            start = graphene.String()
            end = graphene.String()

        is_open_now = graphene.Boolean() # TODO: Because this result will be cached, will need to work this out from open hours
        open = graphene.List(OpenType)

    id = graphene.String()
    name = graphene.String()
    image_url = graphene.String()
    coordinates = graphene.Field(CoordinatesType)
    location = graphene.Field(LocationType)
    display_phone = graphene.String()
    rating = graphene.Float()
    photos = graphene.List(graphene.String)
    hours = graphene.List(HoursType)


class Query(graphene.ObjectType):
    categories = graphene.List(CategoryType)
    sub_categories = graphene.List(CategoryType, category=graphene.String(), countryCode=graphene.String())

    popular_places = graphene.List(PlaceType, lat=graphene.Float(), lng=graphene.Float(), category=graphene.String())
    places = graphene.List(PlaceType, lat=graphene.Float(), lng=graphene.Float(), name=graphene.String(),
                           category=graphene.String())
    place = graphene.Field(PlaceType, id=graphene.String())

    def resolve_categories(self, info, **kwargs):
        categories = Categories()
        return categories.get_top_level_categories()

    def resolve_sub_categories(self, info, **kwargs):
        category = kwargs.get('category')

        if not category:
            raise FieldError("Category parameter is required")

        country_code = kwargs.get('countryCode')

        if not country_code:
            raise FieldError("Country code parameter is required")

        categories = Categories()
        return categories.get_sub_categories(category, country_code)

    def resolve_popular_places(self, info, **kwargs):
        lat = kwargs.get("lat")
        lng = kwargs.get("lng")

        if lat is None or lng is None:
            raise FieldError("Lat, lng parameters are required")

        cat = kwargs.get('category')

        if not cat:
            data = PlacesAPI.get_popular_places(lat, lng)
        else:
            data = PlacesAPI.get_popular_places(lat, lng, cat)

        return data

    def resolve_places(self, info, **kwargs):
        lat = kwargs.get("lat")
        lng = kwargs.get("lng")

        if lat is None or lng is None:
            raise FieldError("Lat, lng parameters are required")

        name = kwargs.get('name')

        if name is None:
            raise FieldError("Name parameter is required")

        cat = kwargs.get('category')

        if not cat:
            data = PlacesAPI.search_nearby_places(lat, lng, name)
        else:
            data = PlacesAPI.search_nearby_places(lat, lng, name, cat)

        return data

    def resolve_place(self, info, **kwargs):
        id = kwargs.get('id')

        if not id:
            raise FieldError("ID parameter is required")

        return PlacesAPI.get_place_detail(id)