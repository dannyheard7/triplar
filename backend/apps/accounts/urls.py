from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token

from .views import Registration

app_name = 'accounts'
urlpatterns = [
    url(r'^register/$', Registration.as_view(), name='register'),
    url(r'^token/$', obtain_jwt_token),
]
