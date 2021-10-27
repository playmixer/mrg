from rest_framework.permissions import BasePermission
from typing import List


class IsModerator(BasePermission):
    """
    Allows access only to authenticated users.
    """

    group = 'moderator'

    def has_permission(self, request, view):
        groups = [g.name for g in request.user.groups.all()]
        return self.group in groups


class IsOrganization(BasePermission):
    """
    Allows access only to authenticated users.
    """

    group = 'organization'

    def has_permission(self, request, view):
        groups = [g.name for g in request.user.groups.all()]
        return self.group in groups
