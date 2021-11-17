from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .. import schemas
import json


class ExceptionUsernameOrPasswordIncorrect(Exception):
    ...


class Auth(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = User.objects.get(username=str(request.user))
        schemas_user = schemas.AuthUserSchema.from_orm(user)
        content = {
            'isAuth': user.is_authenticated,  # None
            **schemas_user.dict(),
            'roles': [group.name for group in user.groups.all()]
        }
        return Response(content)


class AuthLogin(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            data = json.loads(request.body)
            username = authenticate(username=data.get('username'), password=data.get('password'))
            if username is None:
                raise ExceptionUsernameOrPasswordIncorrect("User or password not correct")
            user = User.objects.get(username=username)
            login(request, user=username)
            schemas_user = schemas.AuthUserSchema.from_orm(user)

            return Response({
                'isAuth': user.is_authenticated,
                **schemas_user.dict(),
                'roles': [group.name for group in user.groups.all()]
            })
        except ExceptionUsernameOrPasswordIncorrect as err:
            logout(request)
            return Response({
                'detail': str(err)
            }, 403)
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 500)


class AuthLogout(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logout(request)
        return Response({
            # 'user': request.user,
            'isAuth': False
        })

