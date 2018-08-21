from django.urls import path

from .views import TripList, TripDetail, DestinationList

app_name = 'trips'


# TODO: Change pk to tripId or something more meaningful

urlpatterns = [
    path('', TripList.as_view(), name='trip-list'),
    path('<int:pk>', TripDetail.as_view(), name='trip-detail'),
    path('<int:pk>/destination', DestinationList.as_view(), name='trip-destinations'),
]