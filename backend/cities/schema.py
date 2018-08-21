import graphene
from django.contrib.gis.db import models
from graphene_django.converter import convert_django_field
from graphene_django.types import DjangoObjectType

from .models import City, Country


class GeoJSON(graphene.Scalar):

    @classmethod
    def serialize(cls, value):
        return {"lat": value.y, "lng": value.x}


@convert_django_field.register(models.GeometryField)
def convert_field_to_geojson(field, registry=None):
    return graphene.Field(
        GeoJSON,
        description=field.help_text,
        required=not field.null)


class CountryType(DjangoObjectType):
    class Meta:
        model = Country


class CityType(DjangoObjectType):
    class Meta:
        model = City


class Query(graphene.ObjectType):
    cities = graphene.List(CityType, limit=graphene.Int(), name=graphene.String())

    def resolve_cities(self, info, **kwargs):
        limit = kwargs.get("limit")
        if limit is None:
            limit = 5

        name = kwargs.get("name")
        if name is None:
            name = ""

        return City.objects.filter(name_std__istartswith=name).order_by('-population')[:limit]



schema = graphene.Schema(query=Query)