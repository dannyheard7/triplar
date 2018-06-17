from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

from .views import Registration

app_name = 'accounts'
urlpatterns = [
    path('register/', Registration.as_view(), name='register'),
    path('token/', obtain_jwt_token),
]
