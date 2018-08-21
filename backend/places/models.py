from django.db import models


class APIPlace(models.Model):
    yelp_api_id = models.CharField(max_length=255, unique=True, primary_key=True)