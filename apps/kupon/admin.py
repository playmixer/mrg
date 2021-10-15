from django.contrib import admin
from apps.kupon import models

admin.site.register(models.Coupon)
admin.site.register(models.Organization)
admin.site.register(models.ProposalOrganization)
admin.site.register(models.Offer)
