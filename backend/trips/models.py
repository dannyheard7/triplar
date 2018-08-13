from django.db import models
from django.conf import settings


class Trip(models.Model):
    name = models.CharField(max_length=255, blank=False, unique=False)
    start_date = models.DateField(blank=False)
    end_date = models.DateField(blank=False)
    locations = models.ManyToManyField('cities.City')

    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False, blank=False,
                                   related_name="trips")
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
