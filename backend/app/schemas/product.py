from datetime import datetime

from pydantic import BaseModel


class ProductBase(BaseModel):
    name: str
    name_en: str | None = None
    description: str | None = None
    description_en: str | None = None
    price: int
    stock: int = 0
    images: str | None = None
    category: str | None = None
    shopee_url: str | None = None
    shopee_item_id: str | None = None


class ProductCreate(ProductBase):
    slug: str


class ProductUpdate(BaseModel):
    name: str | None = None
    name_en: str | None = None
    description: str | None = None
    description_en: str | None = None
    price: int | None = None
    stock: int | None = None
    images: str | None = None
    category: str | None = None
    shopee_url: str | None = None
    rating: float | None = None
    sold_count: int | None = None
    is_active: bool | None = None


class ProductResponse(ProductBase):
    id: str
    slug: str
    rating: float
    sold_count: int
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}
