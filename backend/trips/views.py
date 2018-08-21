from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView

from .models import Trip, CityItinerary
from .permissions import VisibleOnlyToCreator
from .serializers import TripListSerializer, TripDetailSerializer, CityItinerarySerializer


class TripList(ListCreateAPIView):
    serializer_class = TripListSerializer

    def get_queryset(self):
        return Trip.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TripDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = TripDetailSerializer
    permission_classes = (VisibleOnlyToCreator,)

    def get_queryset(self):
        return Trip.objects.filter(created_by=self.request.user)


class DestinationList(CreateAPIView):
    serializer_class = CityItinerarySerializer
    permission_classes = (VisibleOnlyToCreator,)

    def get_queryset(self):
        return CityItinerary.objects.filter(trip__created_by=self.request.user)

    def perform_create(self, serializer):
        pk = self.kwargs.get("pk")
        trip = Trip.objects.get(pk=pk)
        serializer.save(trip=trip)