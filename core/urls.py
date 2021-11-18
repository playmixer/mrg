from django.contrib import admin
from django.urls import path, include, re_path
from dotenv import load_dotenv
import os

load_dotenv()

SUBDIRECTORY = os.getenv('SUBDIRECTORY', '')
SUBDIRECTORY = SUBDIRECTORY[1:] + '/' if SUBDIRECTORY.startswith('/') else SUBDIRECTORY

urlpatterns = [
    path(SUBDIRECTORY + 'admin/', admin.site.urls),
    path(SUBDIRECTORY + 'api/v0/', include('apps.api.urls')),
    re_path(f'^{SUBDIRECTORY}(?:.*)/?', include('apps.frontend.urls'))
]
