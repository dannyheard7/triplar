from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny

from .serializers import UserSerializer, RegisterUserSerializer


class Registration(CreateAPIView):
    serializer_class = RegisterUserSerializer
    permission_classes = (AllowAny,)


def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user).data
    }
