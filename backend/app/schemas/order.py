from datetime import datetime

from pydantic import BaseModel


class OrderItemCreate(BaseModel):
    product_id: str
    quantity: int


class OrderItemResponse(BaseModel):
    id: str
    product_id: str
    quantity: int
    price: int

    model_config = {"from_attributes": True}


class OrderCreate(BaseModel):
    shipping_address: str
    shipping_courier: str | None = None
    shipping_service: str | None = None
    payment_method: str | None = None
    notes: str | None = None
    items: list[OrderItemCreate]


class OrderResponse(BaseModel):
    id: str
    code: str
    user_id: str
    status: str
    shipping_address: str
    shipping_courier: str | None
    shipping_service: str | None
    shipping_cost: int
    payment_method: str | None
    payment_status: str
    total: int
    notes: str | None
    created_at: datetime
    updated_at: datetime
    items: list[OrderItemResponse] = []

    model_config = {"from_attributes": True}
