from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ProductBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255, description="Nome do produto")
    category: str = Field(..., min_length=1, max_length=100, description="Categoria do produto")
    price: float = Field(..., gt=0, description="Preço do produto")
    price_display: str = Field(..., description="Preço formatado para exibição (ex: R$ 25,00)")
    description: Optional[str] = Field(None, description="Descrição do produto")
    image_url: Optional[str] = Field(None, description="URL da imagem do produto")
    stock_quantity: int = Field(0, ge=0, description="Quantidade em estoque")
    is_active: bool = Field(True, description="Se o produto está ativo")


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    category: Optional[str] = Field(None, min_length=1, max_length=100)
    price: Optional[float] = Field(None, gt=0)
    price_display: Optional[str] = Field(None)
    description: Optional[str] = Field(None)
    image_url: Optional[str] = Field(None)
    stock_quantity: Optional[int] = Field(None, ge=0)
    is_active: Optional[bool] = Field(None)


class ProductResponse(ProductBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ProductList(BaseModel):
    products: list[ProductResponse]
    total: int
    page: int
    size: int
