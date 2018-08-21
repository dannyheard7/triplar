from django import forms

from cities.forms import CityCountryField
from places.forms import APIPlaceField
from .models import Trip, TripLocation, TripLocationItem


class TripForm(forms.ModelForm):
    class Meta:
        model = Trip
        fields = ["name", "start_date", "end_date"]


class TripLocationForm(forms.ModelForm):
    class Meta:
        model = TripLocation
        fields = ["trip", "city", "start_date", "end_date"]

    city = CityCountryField()


class TripLocationItemForm(forms.ModelForm):
    class Meta:
        model = TripLocationItem
        fields = ["start_time","end_time","start_date","end_date", "order", "location", "api_place"]

    api_place = APIPlaceField()