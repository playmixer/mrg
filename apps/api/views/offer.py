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
from datetime import datetime


class OfferAddress(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            data = request.data
            id = data.get('id')
            print(data)

            addresses_data = data.get('data') or []

            addresses = kuponModels.OfferAddress.objects.filter(offer_id=id)

            with transaction.atomic():
                for address in addresses:
                    if address.name not in addresses_data:
                        address.delete()
                    if address.name in addresses_data:
                        addresses_data.remove(address.name)

                for address in addresses_data:
                    a = kuponModels.OfferAddress(offer_id=id, name=address.get('value'),
                                                 latitude=address.get('geo_lat'),
                                                 longitude=address.get('geo_lon'))
                    a.save()

            offer = kuponModels.Offer.objects.get(id=id)

            return Response({
                'success': True,
                'data': schemas.OfferDict.get(offer)
            })
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)


class BuyCoupon(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            data = request.data
            id = data.get('id')
            user = request.user

            offer = kuponModels.Offer.objects.get(id=id)
            if offer is None:
                raise Exception('Предложение не найдено')

            coupons_all = kuponModels.Coupon.objects.filter(offer_id=offer.id)
            user_coupon_count = coupons_all.filter(user=user).count()
            if user_coupon_count >= offer.quantity_per_hand:
                raise Exception('Приобретено максимальное кол-во купонов в одни руки')

            coupon = coupons_all.filter(user=None).first()
            coupon.user_id = user.id
            coupon.date_buy = datetime.utcnow()
            coupon.save()

            return Response({
                'success': True,
            })
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)


class OfferNoAuth(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        try:
            offers = kuponModels.Offer.objects.order_by('-date_start')
            offers_res = [schemas.OfferDict.get(offer)
                          for offer in offers]

            return Response({
                'success': True,
                'data': offers_res,
            })
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)


class Offer(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            offers = kuponModels.Offer.objects.all()
            offers_res = [schemas.OfferDict.get(offer)
                          for offer in offers]

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
            print(data)
            # coupon_count = data.get('coupon_count')
            # if coupon_count is not None:
            #     del data['coupon_count']
            #     coupon_count = int(coupon_count)
            # else:
            #     raise Exception('Coupon count is not valid')

            with transaction.atomic():
                offer = kuponModels.Offer(**data)
                offer.save()

                # for _ in range(coupon_count):
                #     code = str(offer.id).rjust(10, '0') + ClassOffer.generate_code()
                #     c = kuponModels.Coupon(
                #         offer=offer,
                #         code=code
                #     )
                #     c.save()

            org_res = schemas.OfferDict.get(offer)

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
            offer = kuponModels.Offer.objects.filter(pk=id)
            offer.update(**data)
            # offer.save()

            res = schemas.OfferDict.get(offer[0])

            return Response({
                'success': True,
                'data': res,
            })
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)


class CouponActivate(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            data = request.data
            offer_id = data['offer_id']
            id = data['id']

            coupon = kuponModels.Coupon.objects.filter(offer_id=offer_id, id=id).first()
            if coupon is None:
                raise Exception("Купон не найден")

            coupon.date_activate = datetime.utcnow()
            coupon.save()

            return Response({
                'success': True,
                # 'data': res,
            })
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)


class Coupons(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            data = request.query_params
            offer_id = data['offer_id']

            coupons = kuponModels.Coupon.objects.filter(offer_id=offer_id)
            res = schemas.CouponsDict.get(coupons)

            return Response({
                'success': True,
                'data': res,
            })
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)

    def post(self, request):
        try:
            data = request.data
            offer_id = data['offer_id']

            offer = kuponModels.Offer.objects.get(id=offer_id)

            coupon_count = data.get('count')
            if coupon_count is not None:
                coupon_count = int(coupon_count)
            else:
                raise Exception('Не верное значение кол-ва купонов')

            with transaction.atomic():

                for _ in range(coupon_count):
                    code = str(offer.id).rjust(10, '0') + ClassOffer.generate_code()
                    c = kuponModels.Coupon(
                        offer=offer,
                        code=code
                    )
                    c.save()

            res = schemas.CouponsDict.get(kuponModels.Coupon.objects.filter(offer_id=offer.id))

            return Response({
                'success': True,
                'data': res,
            })
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)
