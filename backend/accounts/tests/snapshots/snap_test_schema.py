# -*- coding: utf-8 -*-
# snapshottest: v1 - https://goo.gl/zC4yUc
from __future__ import unicode_literals

from snapshottest import Snapshot


snapshots = Snapshot()

snapshots['AccountsSchemaTestCase::test_create_user 1'] = {
    'data': {
        'createUser': {
            'errors': [
            ],
            'user': {
                'email': 'email@example.org',
                'id': '1'
            }
        }
    }
}
