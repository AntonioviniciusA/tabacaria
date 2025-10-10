from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Criar engine do SQLAlchemy
engine = create_engine(
    settings.database_url,
    echo=settings.debug,  # Mostra queries SQL no console se debug=True
    pool_pre_ping=True,   # Verifica conexões antes de usar
    pool_recycle=300,     # Recicla conexões a cada 5 minutos
)

# Criar SessionLocal
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para os modelos
Base = declarative_base()


def get_db():
    """
    Dependency para obter sessão do banco de dados
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_tables():
    """
    Cria todas as tabelas no banco de dados
    """
    from app.models import Base
    Base.metadata.create_all(bind=engine)
