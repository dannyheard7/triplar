from rest_framework import permissions


class VisibleOnlyToCreator(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.created_by == request.user
