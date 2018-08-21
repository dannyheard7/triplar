from django.forms import forms

from .models import City


class CityCountryField(forms.Field):
    def clean(self, value):
        value = self.to_python(value)

        try:
            value = value.split(',')
            city_name = value[0].strip()

            if len(value) == 1:
                # Only city information is given, in such case take the matching city name with highest population
                city_obj = City.objects.filter(name_std=city_name).order_by('-population')[0]
            else:
                country_name = value[1].strip()
                city_obj = City.objects.filter(name_std=city_name, country__name=country_name).order_by('-population')[0]
        except IndexError:
            raise forms.ValidationError("Incorrect Location")

        self.validate(city_obj)
        self.run_validators(city_obj)
        return city_obj
