from apps.kupon.models import OfferAddress, Offer, Coupon
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, date


class Group(BaseModel):
    name: str

    class Config:
        orm_mode = True


class UserGroups(BaseModel):
    __root__: List[Group]


class AuthUserSchema(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True


class UserSchema(BaseModel):
    id: int
    username: str

    class Config:
        orm_mode = True


class SearchOrganizationSchema(BaseModel):
    id: int
    title: str
    phone: str
    email: str
    retailer: str
    is_activate: bool

    class Config:
        orm_mode = True


class OrganizationSchema(BaseModel):
    id: int
    title: str
    phone: str
    email: str
    retailer: str
    is_activate: bool
    balance: float
    users: List[UserSchema]

    class Config:
        orm_mode = True


class OrganizationsSchema(BaseModel):
    data: List[OrganizationSchema]

    class Config:
        orm_mode = True


class OfferOrganizationSchema(BaseModel):
    id: int
    title: str
    phone: str
    email: str
    retailer: str
    is_activate: bool

    class Config:
        orm_mode = True


class OfferSchema(BaseModel):
    id: int
    title: str
    description: str
    organization: OfferOrganizationSchema
    date_start: date
    date_end: date
    quantity_per_hand: int
    client_level: int
    image_promo: Optional[str]
    addresses: Optional[list]

    class Config:
        orm_mode = True


class OfferDict:
    @staticmethod
    def get(obj: Offer):
        res = OfferSchema.from_orm(obj).dict()
        res['image_promo'] = f'offer_{res["id"]}_promo.jpg'
        res['addresses'] = [{
            'value': address.name,
            'geo_lat': address.latitude,
            'geo_lon': address.longitude
        } for address in OfferAddress.objects.filter(offer_id=obj.id)]
        return res


class CouponsDict:
    @staticmethod
    def get(obj: Coupon):
        res = dict()
        res['count'] = obj.count()
        res['purchased'] = obj.filter(user_id__isnull=False).count()
        res['activated'] = obj.filter(date_activate__isnull=False).count()

        return res
