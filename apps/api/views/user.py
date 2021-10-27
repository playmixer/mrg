from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from core.classes.permissions import IsModerator, IsOrganization
from apps.kupon import models as modelsKupon
from .. import schemas


class SearchUser(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not IsModerator().has_permission(request=request, view=None):
            raise Exception('Not have permission')

        data = request.query_params
        username = data['username']

        users = User.objects.filter(username__contains=username)

        is_retailer = data.get('is_retailer')
        if is_retailer is not None:
            is_retailer = True if is_retailer.lower() in ['1', 'true', 'yes', 'y'] else False
            user_to_orgs = modelsKupon.UserToOrganization.objects.all()
            if not is_retailer:
                exclude_user = [org.user.id for org in user_to_orgs]
                users = users.exclude(id__in=exclude_user)

            if is_retailer:
                include_user = [org.user.id for org in user_to_orgs]
                users = users.filter(id__in=include_user)

        users_data = [schemas.UserSchema(id=user.id, username=user.username).dict() for user in users]

        return Response({
            'success': True,
            'data': users_data
        })
