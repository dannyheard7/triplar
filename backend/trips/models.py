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


class CityItinerary(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, null=False, blank=False,
                             related_name="itineraries")
    city = models.ForeignKey('cities.City', on_delete=models.PROTECT, null=False, blank=False,
                             related_name="+") # Don't need to create backwards relation

    start_date = models.DateField(blank=False)
    end_date = models.DateField(blank=False)


# Should this class be place type instead of item type, so it's automatic and the user doesn't need to select?
#class ItineraryItemType(models.Model):
#    title = models.CharField(max_length=20, blank=False, unique=True)


class ItineraryItem(models.Model):
    start = models.DateTimeField(blank=False)
    end = models.DateTimeField(blank=False)

    itinerary = models.ForeignKey(CityItinerary, on_delete=models.CASCADE, null=False, blank=False,
                                  related_name="items")

    # type = models.ForeignKey(ItineraryItemType, on_delete=models.PROTECT, null=False, blank=False, related_name="+")


