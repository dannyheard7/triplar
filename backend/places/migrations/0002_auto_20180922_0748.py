# Generated by Django 2.0.5 on 2018-09-22 07:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('places', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='apiplace',
            name='id',
        ),
        migrations.AlterField(
            model_name='apiplace',
            name='yelp_api_id',
            field=models.CharField(default=1, max_length=255, primary_key=True, serialize=False, unique=True),
            preserve_default=False,
        ),
    ]