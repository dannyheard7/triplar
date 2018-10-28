from datetime import datetime

import django_rq
from django.apps import AppConfig

from .cron import categories_extraction_cron


class PlacesConfig(AppConfig):
    name = 'places'

    def ready(self):
        scheduler = django_rq.get_scheduler('default')

        # Delete any existing jobs in the scheduler when the app starts up
        for job in scheduler.get_jobs():
            job.delete()

        scheduler.schedule(
            scheduled_time=datetime.utcnow(),
            func=categories_extraction_cron,
            interval=(60 * 60 * 24 * 30),  # 30 days in seconds
            repeat=None  # None means repeat forever
        )
