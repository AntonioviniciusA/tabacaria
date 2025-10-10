from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.database import get_db
from app.models.product import Product
from app.api.schemas import ProductCreate, ProductUpdate, ProductResponse, ProductList

router = APIRouter(prefix="/products", tags=["products"])


@router.post("/", response_model=ProductResponse, status_code=201)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    """
    Criar um novo produto
    """
    # Verificar se já existe um produto com o mesmo nome
    existing_product = db.query(Product).filter(Product.name == product.name).first()
    if existing_product:
        raise HTTPException(status_code=400, detail="Produto com este nome já existe")
    
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


@router.get("/", response_model=ProductList)
def get_products(
    skip: int = Query(0, ge=0, description="Número de registros para pular"),
    limit: int = Query(10, ge=1, le=100, description="Número máximo de registros para retornar"),
    category: Optional[str] = Query(None, description="Filtrar por categoria"),
    is_active: Optional[bool] = Query(None, description="Filtrar por status ativo"),
    db: Session = Depends(get_db)
):
    """
    Listar produtos com paginação e filtros
    """
    query = db.query(Product)
    
    # Aplicar filtros
    if category:
        query = query.filter(Product.category == category)
    if is_active is not None:
        query = query.filter(Product.is_active == is_active)
    
    # Contar total de registros
    total = query.count()
    
    # Aplicar paginação
    products = query.offset(skip).limit(limit).all()
    
    return ProductList(
        products=products,
        total=total,
        page=skip // limit + 1,
        size=limit
    )


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    """
    Obter um produto específico por ID
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return product


@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int, 
    product_update: ProductUpdate, 
    db: Session = Depends(get_db)
):
    """
    Atualizar um produto
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    
    # Atualizar apenas os campos fornecidos
    update_data = product_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(product, field, value)
    
    db.commit()
    db.refresh(product)
    return product


@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    """
    Deletar um produto (soft delete - marca como inativo)
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    
    product.is_active = False
    db.commit()
    return {"message": "Produto desativado com sucesso"}


@router.get("/categories/", response_model=List[str])
def get_categories(db: Session = Depends(get_db)):
    """
    Obter lista de categorias únicas
    """
    categories = db.query(Product.category).distinct().all()
    return [category[0] for category in categories]
