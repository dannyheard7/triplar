from django.contrib import admin

from .models import Trip, TripLocation, TripLocationItem

admin.site.register(Trip)
admin.site.register(TripLocation)
admin.site.register(TripLocationItem)