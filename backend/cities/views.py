from rest_framework.generics import ListAPIView

from .models import City
from .serializers import CitySearchSerializer


class CitiesSearch(ListAPIView):
    serializer_class = CitySearchSerializer

    def get_queryset(self):
        query = self.request.GET.get('query')
        return City.objects.filter(name_std__istartswith=query).order_by('-population')[:5]

