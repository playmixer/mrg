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

            data = request.data
            coupon_count = data.get('coupon_count')
            if coupon_count is not None:
                del data['coupon_count']
                coupon_count = int(coupon_count)
            else:
                raise Exception('Coupon count is not valid')

            with transaction.atomic():
                offer = kuponModels.Offer(**data)
                offer.save()

                for _ in range(coupon_count):
                    code = str(offer.id).rjust(10, '0') + ClassOffer.generate_code()
                    c = kuponModels.Coupon(
                        offer=offer,
                        code=code
                    )
                    c.save()

            org_res = schemas.OfferSchema.from_orm(offer).dict()

            return Response({
                'success': True,
                'data': org_res,
            })
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)

    def put(self, request):
        try:
            if not IsModerator().has_permission(request=request, view=None):
                raise Exception('Not have permission')

            data = request.data
            id = data.get('id')
            del data['id']
            print(data)
            offer = kuponModels.Offer.objects.filter(pk=id)
            offer.update(**data)
            # offer.save()

            res = schemas.OfferSchema.from_orm(offer[0]).dict()

            return Response({
                'success': True,
                'data': res,
            })
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)
