# Generated by Django 2.0.5 on 2018-08-09 17:22

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.CITIES_CITY_MODEL),
        ('trips', '0002_auto_20180731_1606'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='locations',
            field=models.ManyToManyField(to=settings.CITIES_CITY_MODEL),
        ),
    ]
