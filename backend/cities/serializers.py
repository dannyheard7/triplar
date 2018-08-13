from rest_framework import serializers
from .models import City


class CitySerializer(serializers.ModelSerializer):
    country = serializers.SerializerMethodField()

    def get_country(self, obj):
        return obj.country.name

    class Meta:
        model = City
        fields = ('name_std', 'location', 'country')


class CitySearchSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source='name_std')
    country = serializers.SerializerMethodField()

    def get_country(self, obj):
        return obj.country.name

    class Meta:
        model = City
        fields = ('name', 'country')


# Is this the best way of doing this?
# TODO: convert to RelatedField!
class CityCountryField(serializers.StringRelatedField):
    def to_representation(self, value):
        return '%s, %s' % (value.name_std, value.country.name)

    def to_internal_value(self, data):
        # TODO: Need a better way of dealing with location rather than getting highest population
        data = data.split(',')

        city_name = data[0].strip()

        try:
            if len(data) == 1:
                # Only city information is given, in such case take the matching city name with highest population
                city_obj = City.objects.filter(name_std=city_name).order_by('-population')[0]
            else:
                country_name = data[1].strip()
                city_obj = City.objects.filter(name_std=city_name, country__name=country_name).order_by('-population')[0]

            return city_obj
        except IndexError:
            raise serializers.ValidationError("Location not found")


