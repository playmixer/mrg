from django.urls import path, include
from .views import (
    auth as view_auth,
    organizations as view_organizations,
    user as view_user,
    offer as view_offer
)

urlpatterns = [
    path('auth/', view_auth.Auth.as_view()),
    path('auth/login/', view_auth.AuthLogin.as_view(), name='auth_login'),
    path('auth/logout/', view_auth.AuthLogout.as_view(), name='auth_logout'),
    path('organizations/user/', view_organizations.UserToOrganizations.as_view()),
    path('organizations/', view_organizations.Organizations.as_view()),
    path('user/search/', view_user.SearchUser.as_view()),
    path('offer/', view_offer.Offer.as_view())
]
