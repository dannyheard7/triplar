from rest_framework import serializers

from cities.models import City
from cities.serializers import CityCountryField, CitySerializer
from .models import Trip, CityItinerary


class CityItinerarySerializer(serializers.ModelSerializer):
    city = CityCountryField()

    class Meta:
        model = CityItinerary
        fields = ('id', 'city', 'start_date', 'end_date')


class TripListSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()
    locations = serializers.SerializerMethodField(read_only=True)

    def get_created_by(self, obj):
        return obj.created_by.get_full_name()

    def get_locations(self, obj):
        city_ids = list(map(lambda x: x['city'], obj.itineraries.all().order_by('start_date').values('city')))
        cities = City.objects.filter(id__in=city_ids).all().values('id', 'name_std')
        cities = sorted(cities, key=lambda x: city_ids.index(x['id']))
        return list(map(lambda x: x['name_std'], cities))

    class Meta:
        model = Trip
        fields = ('id', 'name', 'locations', 'start_date', 'end_date', 'created_by')
        read_only_fields = ['created_by', 'locations']

        extra_kwargs = {"created_by": {"required": True}}


class TripDetailSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()
    itineraries = serializers.SerializerMethodField()

    def get_itineraries(self, obj):
        ordered_queryset = obj.itineraries.all().order_by('start_date')
        return CityItinerarySerializer(ordered_queryset, many=True, context=self.context).data

    def get_created_by(self, obj):
        return obj.created_by.get_full_name()

    class Meta:
        model = Trip
        fields = ('id', 'name', 'itineraries', 'start_date', 'end_date', 'created_by')
        read_only_fields = ['created_by', 'itineraries']

        extra_kwargs = {"created_by": {"required": True}}