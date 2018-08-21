import graphene

import accounts.schema
import cities.schema
import places.schema
import trips.schema


class Query(trips.schema.Query, cities.schema.Query, places.schema.Query, graphene.ObjectType):
    pass


class Mutations(accounts.schema.Mutations, trips.schema.Mutations, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query,mutation=Mutations)