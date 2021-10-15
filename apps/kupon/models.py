from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


amount_decimal = {
    'decimal_places': 2,
    'max_digits': 10
}


class Organization(models.Model):
    class Meta:
        db_table = 'organization'

    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False)
    title = models.CharField(max_length=200)
    is_activate = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __repr__(self):
        return f"<{self.id} - {self.title}>"

    def __str__(self):
        return f"<{self.id} - {self.title}>"


class ProposalOrganization(models.Model):
    """
    Заявка на получение статуса организации
    """

    class Meta:
        db_table = 'proposal_organization'

    ST_NONE = 'no'
    ST_REJECTED = 'rj'
    ST_ACCEPTED = 'ac'
    STATUS_CHOICES = [
        (ST_NONE, 'None'),
        (ST_REJECTED, 'Rejected'),
        (ST_ACCEPTED, 'Accepted')
    ]

    organization = models.ForeignKey('Organization', on_delete=models.CASCADE, blank=False)
    status = models.CharField(max_length=2, default=ST_NONE, choices=STATUS_CHOICES)
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
    scores = models.IntegerField(blank=False)
    amount = models.DecimalField(blank=False, **amount_decimal)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Coupon(models.Model):
    class Meta:
        db_table = 'coupon'
        # unique_together = ['offer', 'code']  # уникальность по двум полям

    offer = models.ForeignKey(Offer, on_delete=models.CASCADE, blank=False)
    code = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, default=None)

    def __repr__(self):
        return f"<{self.id} - {self.offer.title}>"

    def __str__(self):
        return f"<{self.id} - {self.offer.title}>"
