import redis

from backend import settings
from .yelp import CategoriesExtraction, TOP_LEVEL_CATEGORIES_REDIS_KEY, ALL_CATEGORIES_REDIS_KEY


def categories_extraction_cron():
    redis_db = redis.Redis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0)

    categories_extraction = CategoriesExtraction()
    categories_extraction.download_file()

    top_level_cateogiries = categories_extraction.extract_top_level_categories()
    redis_db.set(TOP_LEVEL_CATEGORIES_REDIS_KEY, top_level_cateogiries)

    all_categories_with_sub = categories_extraction.reorder_sub_categories()
    redis_db.set(ALL_CATEGORIES_REDIS_KEY, all_categories_with_sub)

