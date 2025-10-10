#!/usr/bin/env python3
"""
Script para inicializar o banco de dados MySQL
"""

import sys
import os
from pathlib import Path

# Adicionar o diretório raiz ao path
sys.path.append(str(Path(__file__).parent.parent))

from app.db.database import create_tables, engine
from app.models.product import Product
from sqlalchemy.orm import sessionmaker

# Criar sessão
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_database():
    """
    Inicializar banco de dados e criar dados de exemplo
    """
    print("🚀 Inicializando banco de dados...")
    
    # Criar tabelas
    create_tables()
    print("✅ Tabelas criadas com sucesso!")
    
    # Criar dados de exemplo
    create_sample_data()
    print("✅ Dados de exemplo criados com sucesso!")
    print("🎉 Banco de dados inicializado com sucesso!")


def create_sample_data():
    """
    Criar dados de exemplo para a tabacaria
    """
    db = SessionLocal()
    
    try:
        # Verificar se já existem produtos
        existing_products = db.query(Product).count()
        if existing_products > 0:
            print("ℹ️  Produtos já existem no banco de dados")
            return
        
        # Dados de exemplo
        sample_products = [
            {
                "name": "Seda OCB Premium",
                "category": "Seda",
                "price": 8.0,
                "price_display": "R$ 8,00",
                "description": "Seda premium de alta qualidade para enrolar",
                "image_url": "/rolling-papers.jpg",
                "stock_quantity": 50,
                "is_active": True
            },
            {
                "name": "Piteira de Papel",
                "category": "Piteira",
                "price": 5.0,
                "price_display": "R$ 5,00",
                "description": "Piteiras de papel biodegradáveis",
                "image_url": "/paper-tips.jpg",
                "stock_quantity": 100,
                "is_active": True
            },
            {
                "name": "Tabaco Virginia",
                "category": "Tabaco",
                "price": 35.0,
                "price_display": "R$ 35,00",
                "description": "Tabaco Virginia premium para enrolar",
                "image_url": "/premium-tobacco.jpg",
                "stock_quantity": 25,
                "is_active": True
            },
            {
                "name": "Tesoura para Tabaco",
                "category": "Tesoura",
                "price": 25.0,
                "price_display": "R$ 25,00",
                "description": "Tesoura especial para tabaco",
                "image_url": "/tobacco-scissors.jpg",
                "stock_quantity": 15,
                "is_active": True
            },
            {
                "name": "Kit Cuia Completo",
                "category": "Kit Cuia",
                "price": 120.0,
                "price_display": "R$ 120,00",
                "description": "Kit completo para chimarrão",
                "image_url": "/mate-gourd-kit.jpg",
                "stock_quantity": 10,
                "is_active": True
            },
            {
                "name": "Slick Antiaderente",
                "category": "Slick",
                "price": 15.0,
                "price_display": "R$ 15,00",
                "description": "Slick antiaderente para enrolar",
                "image_url": "/slick-pad.jpg",
                "stock_quantity": 30,
                "is_active": True
            },
            {
                "name": "Piteira de Vidro",
                "category": "Piteira de Vidro",
                "price": 45.0,
                "price_display": "R$ 45,00",
                "description": "Piteira de vidro reutilizável",
                "image_url": "/glass-tip.jpg",
                "stock_quantity": 20,
                "is_active": True
            },
            {
                "name": "Filtro de Carvão Ativado",
                "category": "Filtro",
                "price": 12.0,
                "price_display": "R$ 12,00",
                "description": "Filtros de carvão ativado para purificação",
                "image_url": "/activated-carbon-filters.jpg",
                "stock_quantity": 40,
                "is_active": True
            }
        ]
        
        # Inserir produtos
        for product_data in sample_products:
            product = Product(**product_data)
            db.add(product)
        
        db.commit()
        print(f"✅ {len(sample_products)} produtos criados com sucesso!")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Erro ao criar dados de exemplo: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    init_database()
