from django.urls import path, include
from .views import (
    auth as view_auth,
    organizations as view_organizations,
    user as view_user,
    offer as view_offer,
    main as view_main
)

urlpatterns = [
    path('auth/', view_auth.Auth.as_view()),
    path('auth/registration/', view_auth.Registration.as_view()),
    path('auth/login/', view_auth.AuthLogin.as_view(), name='auth_login'),
    path('auth/logout/', view_auth.AuthLogout.as_view(), name='auth_logout'),

    path('organizations/user/', view_organizations.UserToOrganizations.as_view()),
    path('organizations/search/', view_organizations.SearchOrganizations.as_view()),
    path('organizations/', view_organizations.Organizations.as_view()),

    path('organization/', view_organizations.CurrentOrganization.as_view()),

    path('user/search/', view_user.SearchUser.as_view()),
    path('user/coupons/', view_user.Coupons.as_view()),
    # path('user/coupon/', view_user.Coupon.as_view()),

    path('offer/coupon/buy/', view_offer.BuyCoupon.as_view()),
    path('offer/coupons/', view_offer.Coupons.as_view()),
    path('offer/coupon/activate/', view_offer.CouponActivate.as_view()),
    path('offer/address/', view_offer.OfferAddress.as_view()),
    path('offer/', view_offer.Offer.as_view()),

    path('offers/', view_offer.OfferNoAuth.as_view()),

    path('upload/', view_main.Upload.as_view()),
    path('stores/', view_main.Stores.as_view()),
    path('city/', view_main.City.as_view())
]
