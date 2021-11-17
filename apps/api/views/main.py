from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from core.classes.permissions import IsModerator, IsOrganization
from apps.kupon import models as kuponModels
from django.contrib.auth.models import User
from django.db import transaction
from rest_framework.views import APIView
from .. import schemas
from core.classes.offer import Offer as ClassOffer
from django.core.files.storage import FileSystemStorage
from django.http import FileResponse
from django.conf import settings
import os


class Upload(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            data = request.data
            file = request.FILES['file']

            directory = settings.MEDIA_ROOT
            filename = data.get('name')

            fs = FileSystemStorage(location=directory)
            if fs.exists(filename):
                os.remove(os.path.join(directory, filename))

            fs.save(data.get('name'), file)

            return Response({
                'success': True,
                'file': filename
            })
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)


class Stores(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        try:
            data = request.query_params
            filename = data.get('file')

            directory = settings.MEDIA_ROOT
            file = open(os.path.join(directory, filename), 'rb')

            return FileResponse(file)
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)
