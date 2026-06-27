from datetime import datetime

from pydantic import BaseModel


class UserRegister(BaseModel):
    email: str
    name: str
    phone: str | None = None
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    phone: str | None
    is_admin: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
