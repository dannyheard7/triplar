

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView


from .models import Trip
from .permissions import VisibleOnlyToCreator
from .serializers import TripSerializer


class TripList(ListCreateAPIView):
    serializer_class = TripSerializer

    def get_queryset(self):
        return Trip.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TripDetail(RetrieveUpdateDestroyAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = (VisibleOnlyToCreator,)
