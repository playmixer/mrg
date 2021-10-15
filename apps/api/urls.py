from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from . import views

urlpatterns = [
    # path('', views.index, name='index'),
    path('auth/', views.Auth.as_view()),
    path('auth/login/', csrf_exempt(views.AuthLogin.as_view()), name='auth_login'),
    path('auth/logout/', views.AuthLogout.as_view(), name='auth_logout')
]
