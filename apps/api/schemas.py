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
    users: List[UserSchema]

    class Config:
        orm_mode = True


class OrganizationsSchema(BaseModel):
    data = list[OrganizationSchema]

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

    class Config:
        orm_mode = True
