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


# class Coupon(APIView):
#     authentication_classes = [SessionAuthentication, BasicAuthentication]
#     permission_classes = [IsAuthenticated]
#
#     def get(self, request):
#         try:
#             user = request.user
#             data = request.data
#             id = data.get('id')
#
#             coupons = modelsKupon.Coupon.objects.filter(user_id=user.id, offer_id=id)
#             res = [{
#                 'id': coupon.id,
#                 'title': coupon.offer.title,
#                 'date_start': coupon.offer.date_start,
#                 'date_end': coupon.offer.date_end
#             } for coupon in coupons]
#
#             return Response({
#                 'success': True,
#                 'data': res
#             })
#         except Exception as err:
#             return Response({
#                 'detail': str(err)
#             }, 400)


class Coupons(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user

            coupons = modelsKupon.Coupon.objects.filter(user_id=user.id).order_by('-date_buy')
            res = [{
                'id': coupon.id,
                'offer_id': coupon.offer.id,
                'title': coupon.offer.title,
                'date_start': coupon.offer.date_start,
                'date_end': coupon.offer.date_end,
                'image_promo': f'offer_{coupon.offer.id}_promo.jpg',
                'code': coupon.code
            } for coupon in coupons]

            return Response({
                'success': True,
                'data': res
            })
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)
