from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.products import router as products_router
from app.db.database import create_tables

# Criar aplicação FastAPI
app = FastAPI(
    title="Tabacaria API",
    description="API para gerenciamento de produtos da tabacaria",
    version="1.0.0",
    debug=settings.debug
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(products_router, prefix=settings.api_v1_str)


@app.on_event("startup")
async def startup_event():
    """
    Evento executado na inicialização da aplicação
    """
    # Criar tabelas do banco de dados
    create_tables()
    print("✅ Banco de dados inicializado com sucesso!")


@app.get("/")
async def root():
    """
    Endpoint raiz da API
    """
    return {
        "message": "Bem-vindo à API da Tabacaria!",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }


@app.get("/health")
async def health_check():
    """
    Endpoint para verificar saúde da API
    """
    return {"status": "healthy", "message": "API funcionando corretamente"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug
    )
