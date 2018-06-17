from django.urls import path

from .views import TripList, TripDetail

app_name = 'trips'
urlpatterns = [
    path('', TripList.as_view(), name='trip-list'),
    path('<int:pk>', TripDetail.as_view(), name='trip-detail'),
]