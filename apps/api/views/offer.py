from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from core.classes.permissions import IsModerator, IsOrganization
from apps.kupon import models as kuponModels
from django.contrib.auth.models import User
from rest_framework.views import APIView
from .. import schemas


class Offer(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            if not IsModerator().has_permission(request=request, view=None):
                raise Exception('Not have permission')

            offers = kuponModels.Offer.objects.all()
            print(offers)
            offers_res = [schemas.OfferSchema.from_orm(offer).dict() for offer in offers]
            print(offers_res)

            return Response({
                'success': True,
                'data': offers_res,
            })
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)

    def post(self, request):
        try:
            if not IsModerator().has_permission(request=request, view=None):
                raise Exception('Not have permission')

        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)
