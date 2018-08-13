from rest_framework import serializers

from cities.serializers import CityCountryField
from .models import Trip


class TripSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()
    locations = CityCountryField(many=True)

    def get_created_by(self, obj):
        return obj.created_by.get_full_name()

    class Meta:
        model = Trip
        fields = ('id', 'name', 'locations', 'start_date', 'end_date', 'created_by')
        read_only_fields = ['created_by']

        extra_kwargs = {"created_by": {"required": True}}
