# -*- coding: utf-8 -*-
# snapshottest: v1 - https://goo.gl/zC4yUc
from __future__ import unicode_literals

from snapshottest import Snapshot


snapshots = Snapshot()

snapshots['TripSchemaTestCase::test_get_trip_detail 1'] = {
    'errors': [
        {
            'locations': [
                {
                    'column': 21,
                    'line': 14
                }
            ],
            'message': 'Cannot query field "city" on type "TripLocationType".'
        }
    ]
}

snapshots['TripSchemaTestCase::test_get_trips 1'] = {
    'errors': [
        {
            'locations': [
                {
                    'column': 21,
                    'line': 10
                }
            ],
            'message': 'Cannot query field "city" on type "TripLocationType".'
        }
    ]
}

snapshots['TripSchemaTestCase::test_create_trip 1'] = {
    'data': {
        'createTrip': {
            'errors': [
            ],
            'trip': {
                'id': '2'
            }
        }
    }
}

snapshots['TripSchemaTestCase::test_delete_trip 1'] = {
    'data': {
        'deleteTrip': {
            'result': True
        }
    }
}

snapshots['TripSchemaTestCase::test_add_trip_location 1'] = {
    'errors': [
        {
            'locations': [
                {
                    'column': 17,
                    'line': 7
                }
            ],
            'message': 'Cannot query field "city" on type "TripLocationType".'
        }
    ]
}

snapshots['TripSchemaTestCase::test_add_trip_location_item 1'] = {
    'data': {
        'addTripLocationItem': {
            'errors': [
            ],
            'tripLocationItem': {
                'id': '1'
            }
        }
    }
}
