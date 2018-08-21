from django.db import models
from django.conf import settings


class Trip(models.Model):
    name = models.CharField(max_length=255, blank=False, unique=False)
    start_date = models.DateField(blank=False)
    end_date = models.DateField(blank=False)

    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False, blank=False,
                                   related_name="trips")
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)


class TripLocation(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, null=False, blank=False,
                             related_name="locations")
    city = models.ForeignKey('cities.City', on_delete=models.PROTECT, null=False, blank=False,
                             related_name="locations")

    start_date = models.DateField(blank=False)
    end_date = models.DateField(blank=False)


class TripLocationItem(models.Model):
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    start_date = models.DateField(null=False, blank=False)
    end_date = models.DateField(null=False, blank=False)

    order = models.IntegerField(blank=False)

    location = models.ForeignKey(TripLocation, on_delete=models.CASCADE, null=False, blank=False,
                                 related_name="items")

    api_place = models.ForeignKey('places.APIPlace', on_delete=models.PROTECT, null=True, related_name='+')


