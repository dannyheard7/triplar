from rest_framework import serializers
from .models import Trip


class TripSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trip
        fields = ('id', 'name', 'start_date', 'end_date', 'date_created', 'date_modified')
        read_only_fields = ('date_created', 'date_modified')