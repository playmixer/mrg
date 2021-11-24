from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from core.classes.permissions import IsModerator, IsOrganization
from apps.kupon import models as kuponModels
from django.contrib.auth.models import User
from rest_framework.views import APIView
from .. import schemas


class CurrentOrganization(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            userOrg = kuponModels.UserToOrganization.objects.filter(user=user).first()

            res = schemas.CurrentOrganizationSchema.from_orm(userOrg.organization).dict()
            offers = kuponModels.Offer.objects.filter(organization_id=userOrg.organization.id)
            res['offers'] = [schemas.OfferSchema.from_orm(offer).dict() for offer in offers]

            return Response({
                'success': True,
                'data': res
            })
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)


class SearchOrganizations(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            if not IsModerator().has_permission(request=request, view=None):
                raise Exception('Not have permission')
            data = request.query_params
            search_title = data.get('title')
            orgs = kuponModels.Organization.objects.filter(title__contains=search_title)
            orgs_res = [schemas.SearchOrganizationSchema.from_orm(org).dict() for org in orgs]

            return Response({
                'success': True,
                'data': orgs_res
            })
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)


class Organizations(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orgs = kuponModels.Organization.objects.all()
        orgs_resp = [schemas.OrganizationSchema(
            id=org.id,
            title=org.title,
            email=org.email,
            phone=org.phone,
            retailer=org.retailer,
            is_activate=org.is_activate,
            balance=org.balance,
            # users=[schemas.UserSchema(id=org.user.id, username=org.user.username) for org in
            #        kuponModels.UserToOrganization.objects.filter(organization_id=org.id)]
            users=[schemas.UserSchema.from_orm(org.user).dict() for org in
                   kuponModels.UserToOrganization.objects.filter(organization_id=org.id)]
        ).dict() for org in orgs]
        return Response({
            'success': True,
            'data': orgs_resp
        })

    def post(self, request):
        try:
            if not IsModerator().has_permission(request=request, view=None):
                raise Exception('Not have permission')
            data = request.data
            title = data['title']
            email = data['email']
            phone = data['phone']
            retailer = data['retailer']
            # org_user = User.objects.get(username=data['user'])
            org = kuponModels.Organization(
                title=title, email=email, phone=phone, retailer=retailer
            )
            org.save()

            return Response({
                'success': True,
                'data': schemas.OrganizationSchema.from_orm(org).dict()
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
            id = data['id']
            title = data['title']
            email = data['email']
            phone = data['phone']
            retailer = data['retailer']
            is_activate = data['is_activate']

            org = kuponModels.Organization.objects.get(id=id)
            if org is None:
                raise Exception('Not found organization')

            org.email = email
            org.title = title
            org.phone = phone
            org.retailer = retailer
            org.is_activate = is_activate
            org.save()

            return Response({
                'success': True,
                'data': schemas.OrganizationSchema.from_orm(org).dict()
            })
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)


class UserToOrganizations(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    # def get(self, request):
    #     users = kuponModels.UserToOrganization.objects.all()
    #
    #     return Response({
    #         'success': True,
    #         'data': [schemas.UserSchema(id=user.id, username=user.username).dict() for user in users]
    #     })

    def post(self, request):
        try:
            if not IsModerator().has_permission(request=request, view=None):
                raise Exception('Not have permission')

            data = request.data
            id = data['org_id']
            username = data['username']
            user_id = data['id']

            user = User.objects.get(id=user_id)
            if user is None or user.username != username:
                raise Exception('User')
            org = kuponModels.Organization.objects.get(id=id)
            if org is None:
                raise Exception('Organization')

            user_to_org = kuponModels.UserToOrganization(user=user, organization=org)
            user_to_org.save()

            # org = kuponModels.Organization.objects.get(id=id)
            org_resp = schemas.OrganizationSchema(
                id=org.id,
                title=org.title,
                email=org.email,
                phone=org.phone,
                retailer=org.retailer,
                is_activate=org.is_activate,
                # users=[schemas.UserSchema(id=org.user.id, username=org.user.username) for org in
                #        kuponModels.UserToOrganization.objects.filter(organization_id=org.id)]
                users=[schemas.UserSchema.from_orm(org.user).dict() for org in
                       kuponModels.UserToOrganization.objects.filter(organization_id=org.id)],
                balance=org.balance
            ).dict()

            return Response({
                'success': True,
                'data': org_resp
            })
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)

    def delete(self, request):
        try:
            if not IsModerator().has_permission(request=request, view=None):
                raise Exception('Not have permission')

            data = request.data
            id = data['org_id']
            username = data['username']
            user_id = data['id']
            user = User.objects.get(id=user_id)
            if user is None:
                raise Exception('User')
            org = kuponModels.Organization.objects.get(id=id)
            if org is None:
                raise Exception("Organization")
            user_to_org = kuponModels.UserToOrganization.objects.filter(user_id=user.id, organization_id=org.id)
            if user_to_org is None:
                raise Exception("Can't remove user, try later")
            if user_to_org is not None:
                user_to_org.delete()

            org = kuponModels.Organization.objects.get(id=id)
            org_resp = schemas.OrganizationSchema(
                id=org.id,
                title=org.title,
                email=org.email,
                phone=org.phone,
                retailer=org.retailer,
                is_activate=org.is_activate,
                # users=[schemas.UserSchema(id=org.user.id, username=org.user.username) for org in
                #        kuponModels.UserToOrganization.objects.filter(organization_id=org.id)]
                users=[schemas.UserSchema.from_orm(org.user).dict() for org in
                       kuponModels.UserToOrganization.objects.filter(organization_id=org.id)],
                balance=org.balance
            ).dict()

            return Response({
                'success': True,
                'data': org_resp
            })
        except Exception as err:
            return Response({
                'detail': str(err)
            }, 400)
