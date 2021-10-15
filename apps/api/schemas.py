from pydantic import BaseModel


class AuthUserSchema(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True
