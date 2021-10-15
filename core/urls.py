from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('kupon/', include('apps.kupon.urls')),
    path('api/v0/', include('apps.api.urls')),

    re_path('^(?:.*)/?', include('apps.frontend.urls'))
]

