from django.contrib import admin

from .models import Trip, CityItinerary, ItineraryItem

admin.site.register(Trip)
admin.site.register(CityItinerary)
admin.site.register(ItineraryItem)