import graphene
from graphene.test import Client
from snapshottest.django import TestCase

import accounts.schema


class AccountsSchemaTestCase(TestCase):
    def setUp(self):
        schema = graphene.Schema(mutation=accounts.schema.Mutations)
        self.client = Client(schema)

    def test_create_user(self):
        create_user_query = """
        mutation CreateUser($input: UserMutationInput!){
              createUser(input: $input) {
                user {
                    id
                    email
                }
                errors {
                  field
                  messages
                }
              }
        }"""

        variables = {'input': {"email": "email@example.org", "firstName": "Example", "lastName": "Person",
                               "password": "dkhdofgfnfkdsoifhdvnio@#765y"}}

        self.assertMatchSnapshot(self.client.execute(create_user_query, variable_values=variables))
