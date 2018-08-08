from rest_framework import serializers
from .models import Trip


class TripSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()

    def get_created_by(self, obj):
        return obj.created_by.get_full_name()

    class Meta:
        model = Trip
        fields = ('id', 'name', 'start_date', 'end_date', 'created_by', 'date_created', 'date_modified')
        read_only_fields = ('date_created', 'date_modified')
