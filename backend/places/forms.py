from django.forms import forms

from .models import APIPlace


class APIPlaceField(forms.Field):
    def clean(self, value):
        value = self.to_python(value)

        obj, created = APIPlace.objects.get_or_create(yelp_api_id=value)

        self.validate(obj)
        self.run_validators(obj)
        return obj
