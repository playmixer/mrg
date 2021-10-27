from django.contrib import admin
from apps.kupon import models

admin.site.register(models.Coupon)
admin.site.register(models.Organization)
admin.site.register(models.UserToOrganization)
admin.site.register(models.Offer)
