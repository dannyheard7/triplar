import json
import urllib

import redis
import requests

from backend import settings


class PlacesAPI:
    default_categories = "active,arts,specialtyschools,tastingclasses,tours,localflavor,nightlife,landmarks,shopping"

    @classmethod
    def api_request(cls, url):
        redis_db = redis.Redis(host='localhost', port=6379, db=0)
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
    def search_nearby_places(cls, lat, lng, query,  categories="all", limit="8"):
        url = 'https://api.yelp.com/v3/businesses/search?latitude=' + str(lat) + \
              '&longitude=' + str(lng) + '&limit=' + limit + "&categories=" + categories + "&term=" + query
        items = cls.api_request(url)['businesses']
        return items

    @classmethod
    def get_place_detail(cls, id):
        url = 'https://api.yelp.com/v3/businesses/' + id
        items = cls.api_request(url)

        return items
