from django.urls import path

from .views import CitiesSearch

app_name = 'cities'
urlpatterns = [
    path('cities/search', CitiesSearch.as_view(), name='cities-search'),
]