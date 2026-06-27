import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product
from app.schemas.order import OrderCreate, OrderResponse

router = APIRouter(prefix="/api/orders", tags=["orders"])


def generate_order_code() -> str:
    now = datetime.now(timezone.utc)
    return f"FLX-{now.strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"


@router.post("", response_model=OrderResponse, status_code=201)
async def create_order(body: OrderCreate, db: AsyncSession = Depends(get_db)):
    total = 0
    order_items = []

    for item in body.items:
        result = await db.execute(select(Product).where(Product.id == item.product_id))
        product = result.scalar_one_or_none()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        if product.stock < item.quantity:
            raise HTTPException(status_code=400, detail=f"Insufficient stock for {product.name}")

        product.stock -= item.quantity
        item_price = product.price * item.quantity
        total += item_price
        order_items.append(
            OrderItem(product_id=product.id, quantity=item.quantity, price=product.price)
        )

    order = Order(
        id=str(uuid.uuid4()),
        code=generate_order_code(),
        user_id=str(uuid.uuid4()),
        shipping_address=body.shipping_address,
        shipping_courier=body.shipping_courier,
        shipping_service=body.shipping_service,
        payment_method=body.payment_method,
        notes=body.notes,
        total=total,
    )
    db.add(order)
    await db.flush()

    for oi in order_items:
        oi.order_id = order.id
        db.add(oi)

    await db.commit()
    await db.refresh(order)
    return order


@router.get("/{code}", response_model=OrderResponse)
async def get_order(code: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Order).where(Order.code == code))
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
