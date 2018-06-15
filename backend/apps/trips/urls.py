from django.conf.urls import url

from .views import TripList, TripDetail


app_name = 'trips'
urlpatterns = [
    url(r'^$', TripList.as_view(), name='trip-list'),
    url(r'^(?P<pk>\d+)', TripDetail.as_view(), name='trip-detail'),
]