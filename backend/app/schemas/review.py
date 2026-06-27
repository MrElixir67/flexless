from datetime import datetime

from pydantic import BaseModel


class ReviewCreate(BaseModel):
    product_id: str
    author_name: str
    rating: int
    comment: str | None = None
    source: str | None = None
    shopee_review_id: str | None = None


class ReviewResponse(BaseModel):
    id: str
    product_id: str
    author_name: str
    rating: int
    comment: str | None
    source: str | None
    shopee_review_id: str | None
    created_at: datetime

    model_config = {"from_attributes": True}
