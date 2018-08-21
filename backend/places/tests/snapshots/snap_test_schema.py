# -*- coding: utf-8 -*-
# snapshottest: v1 - https://goo.gl/zC4yUc
from __future__ import unicode_literals

from snapshottest import Snapshot


snapshots = Snapshot()

snapshots['PopularPlacesListViewTestCase::test_returns_serialized_places 1'] = {
    'data': {
        'popularPlaces': [
            {
                'id': '1',
                'imageUrl': 'example.com',
                'name': 'Place 1'
            },
            {
                'id': '2',
                'imageUrl': 'example.com',
                'name': 'Place 2'
            }
        ]
    }
}

snapshots['PlacesNameSearchTestCase::test_returns_serialized_places 1'] = {
    'data': {
        'places': [
            {
                'id': '1',
                'imageUrl': 'example.com',
                'name': 'Place 1'
            },
            {
                'id': '2',
                'imageUrl': 'example.com',
                'name': 'Place 2'
            }
        ]
    }
}
