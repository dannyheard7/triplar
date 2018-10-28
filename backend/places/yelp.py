import json
import os
import urllib

import redis
import requests

import places
from backend import settings

TOP_LEVEL_CATEGORIES_REDIS_KEY = "yelp-top-level-categories"
ALL_CATEGORIES_REDIS_KEY = "yelp-all-categories"


class PlacesAPI:
    default_categories = "active,arts,specialtyschools,tastingclasses,tours,localflavor,nightlife,landmarks,shopping"

    @classmethod
    def api_request(cls, url):
        redis_db = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0, charset="utf-8", decode_responses=True)
        expire_seconds = (24 * 60 * 60)  # 24 hours in seconds

        url = urllib.parse.quote_plus(url, safe=';/?:@&=+$,')

        if redis_db.get(url):
            items = redis_db.get(url)
        else:
            response = requests.get(url, headers={'Authorization': 'Bearer ' + settings.YELP_APP_KEY})
            items = response.text
            redis_db.set(url, items, ex=expire_seconds)

        return json.loads(items)

    @classmethod
    def get_popular_places(cls, lat, lng, categories=default_categories, limit="8"):
        url = 'https://api.yelp.com/v3/businesses/search?latitude=' + str(lat) + \
              '&longitude=' + str(lng) + '&limit=' + limit + "&categories=" + categories
        items = cls.api_request(url)['businesses']

        return items

    @classmethod
    def search_nearby_places(cls, lat, lng, query, categories="all", limit="8"):
        url = 'https://api.yelp.com/v3/businesses/search?latitude=' + str(lat) + \
              '&longitude=' + str(lng) + '&limit=' + limit + "&categories=" + categories + "&term=" + query
        items = cls.api_request(url)['businesses']
        return items

    @classmethod
    def get_place_detail(cls, id):
        url = 'https://api.yelp.com/v3/businesses/' + id
        items = cls.api_request(url)

        return items


class Categories:
    def load_json_from_redis(self, key):
        redis_db = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0, charset="utf-8", decode_responses=True)
        return json.loads(redis_db.get(key).replace("\'", "\""))

    def get_top_level_categories(self):
        return self.load_json_from_redis(TOP_LEVEL_CATEGORIES_REDIS_KEY)

    def get_sub_categories(self, category, country_code):
        all_categories = self.load_json_from_redis(ALL_CATEGORIES_REDIS_KEY)
        parent_index = next((index for (index, d) in enumerate(all_categories) if d["alias"] == category), None)
        sub_categories = all_categories[parent_index]["sub_categories"]
        filtered_sub_categories = []

        for sub_category in sub_categories:
            if len(sub_category["country_whitelist"]) == 0 and len(sub_category['country_blacklist']) == 0:
                filtered_sub_categories.append(sub_category)
            elif len(sub_category["country_whitelist"]) > 0 and country_code in sub_category["country_whitelist"]:
                filtered_sub_categories.append(sub_category)
            elif country_code not in sub_category['country_blacklist']:
                filtered_sub_categories.append(sub_category)

        return filtered_sub_categories


class CategoriesExtraction:
    url = "https://api.yelp.com/v3/categories"
    filename = os.path.join(os.path.dirname(places.__file__), "data/categories.json")

    def download_file(self):
        if not os.path.exists(os.path.dirname(self.filename)):
            os.makedirs(os.path.dirname(self.filename))

        with open(self.filename, "wb+") as file:
            response = requests.get(self.url, headers={'Authorization': 'Bearer ' + settings.YELP_APP_KEY})
            file.write(response.content)

    def load_file_as_json(self):
        with open(self.filename) as json_data:
            data = json.load(json_data)

        return data

    def extract_top_level_categories(self):
        all_categories = self.load_file_as_json()['categories']
        top_level = [x for x in all_categories if len(x['parent_aliases']) == 0]
        return top_level

    def reorder_sub_categories(self):
        all_categories = self.load_file_as_json()['categories']

        top_level = [x for x in all_categories if len(x['parent_aliases']) == 0]
        sub_categories = [x for x in all_categories if len(x['parent_aliases']) > 0]

        # This just gets the top level sub categories. There are also sub categories of sub categories if we want to do that
        # while len(sub_categories) > 0:
        for sub_category in sub_categories:
            parent_category = sub_category['parent_aliases'][0]
            parent_index = next((index for (index, d) in enumerate(top_level) if d["alias"] == parent_category), None)

            if parent_index is not None:
                parent = top_level[parent_index]

                if 'sub_categories' in parent:
                    parent["sub_categories"].append(sub_category)
                else:
                    parent["sub_categories"] = [sub_category]

            sub_categories.remove(sub_category)
        return top_level
