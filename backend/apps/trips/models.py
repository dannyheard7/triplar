from django.db import models
from django.conf import settings


class Trip(models.Model):
    name = models.CharField(max_length=255, blank=False, unique=False)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False, related_name="trips")
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
