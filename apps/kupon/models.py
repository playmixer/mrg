from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

money_decimal = {
    'decimal_places': 2,
    'max_digits': 10
}


class Organization(models.Model):
    class Meta:
        db_table = 'organization'

    # user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False)
    title = models.CharField(max_length=200, unique=True)
    phone = models.CharField(max_length=12)
    email = models.CharField(max_length=200)
    retailer = models.CharField(max_length=200)
    is_activate = models.BooleanField(default=False)
    balance = models.DecimalField(blank=False, default=0, **money_decimal)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __repr__(self):
        return f"<{self.id} - {self.title}>"

    def __str__(self):
        return f"<{self.id} - {self.title}>"


class UserToOrganization(models.Model):
    """
    Заявка на получение статуса организации
    """

    class Meta:
        db_table = 'user_organization'

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    organization = models.ForeignKey('Organization', on_delete=models.CASCADE, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __repr__(self):
        return f"<{self.id} - {self.organization.title}>"

    def __str__(self):
        return f"<{self.id} - {self.organization.title}>"


class Offer(models.Model):
    class Meta:
        db_table = 'offer'

    ST_NONE = 'no'
    ST_REJECTED = 'rj'
    ST_ACCEPTED = 'ac'
    STATUS_CHOICES = [
        (ST_NONE, 'None'),
        (ST_REJECTED, 'Rejected'),
        (ST_ACCEPTED, 'Accepted')
    ]

    title = models.CharField(max_length=200)
    description = models.CharField(max_length=1000, blank=True)
    organization = models.ForeignKey('Organization', on_delete=models.CASCADE, blank=False)
    is_activate = models.BooleanField(default=False)  # активированно организацией
    moderate_status = models.CharField(max_length=2, default=ST_NONE, choices=STATUS_CHOICES)
    date_start = models.DateField(blank=False)
    date_end = models.DateField(blank=False)
    scores = models.IntegerField(blank=False, default=0)
    amount = models.DecimalField(blank=False, default=0, **money_decimal)
    quantity_per_hand = models.IntegerField(blank=False, default=1)
    client_level = models.IntegerField(blank=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class OfferAddress(models.Model):
    class Meta:
        db_table = 'offer_address'

    offer = models.ForeignKey(Offer, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, blank=False, null=False)
    latitude = models.FloatField(blank=True, default=None)
    longitude = models.FloatField(blank=True, default=None)


class Coupon(models.Model):
    class Meta:
        db_table = 'coupon'
        # unique_together = ['offer', 'code']  # уникальность по двум полям

    offer = models.ForeignKey(Offer, on_delete=models.CASCADE, blank=False)
    code = models.CharField(max_length=200, unique=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    date_buy = models.DateTimeField(blank=True, default=None, null=True)
    date_activate = models.DateTimeField(blank=True, default=None, null=True)

    def __repr__(self):
        return f"<{self.id} - {self.offer.title}>"

    def __str__(self):
        return f"<{self.id} - {self.offer.title}>"
