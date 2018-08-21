import graphene
import graphql_jwt
from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene_django.types import DjangoObjectType

from .forms import UserForm
from .models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User


class ObtainJSONWebToken(graphql_jwt.JSONWebTokenMutation):
    user = graphene.Field(UserType)

    @classmethod
    def resolve(cls, root, info):
        return cls(user=info.context.user)


class UserMutation(DjangoModelFormMutation):
    class Meta:
        form_class = UserForm


class Mutations(graphene.ObjectType):
    create_user = UserMutation.Field()
    token_auth = ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(mutation=Mutations)