# Tabacaria Backend API

API backend para o sistema de catálogo da tabacaria, desenvolvida com FastAPI e MySQL.

## 🚀 Tecnologias

- **FastAPI** - Framework web moderno e rápido
- **SQLAlchemy** - ORM para Python
- **MySQL** - Banco de dados
- **Pydantic** - Validação de dados
- **Uvicorn** - Servidor ASGI

## 📁 Estrutura do Projeto

```
backend/
├── app/
│   ├── api/           # Endpoints da API
│   ├── core/          # Configurações
│   ├── db/            # Configuração do banco
│   ├── models/        # Modelos do banco de dados
│   └── main.py        # Aplicação principal
├── scripts/           # Scripts utilitários
├── requirements.txt   # Dependências Python
└── README.md         # Este arquivo
```

## 🛠️ Instalação

### 1. Instalar dependências

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configurar banco de dados

1. Instalar MySQL no seu sistema
2. Criar um banco de dados chamado `tabacaria_db`
3. Copiar o arquivo `env.example` para `.env` e configurar as variáveis:

```bash
cp env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
DATABASE_URL=mysql+pymysql://root:seu_password@localhost:3306/tabacaria_db
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=seu_password
DB_NAME=tabacaria_db
```

### 3. Inicializar banco de dados

```bash
python scripts/init_db.py
```

### 4. Executar servidor

```bash
python scripts/run_server.py
```

Ou usando uvicorn diretamente:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 📚 Documentação da API

Após iniciar o servidor, acesse:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔗 Endpoints Disponíveis

### Produtos

- `GET /api/v1/products/` - Listar produtos (com paginação e filtros)
- `POST /api/v1/products/` - Criar novo produto
- `GET /api/v1/products/{id}` - Obter produto específico
- `PUT /api/v1/products/{id}` - Atualizar produto
- `DELETE /api/v1/products/{id}` - Desativar produto
- `GET /api/v1/products/categories/` - Listar categorias

### Exemplos de Uso

#### Criar um produto:

```bash
curl -X POST "http://localhost:8000/api/v1/products/" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Novo Produto",
    "category": "Categoria",
    "price": 25.50,
    "price_display": "R$ 25,50",
    "description": "Descrição do produto",
    "image_url": "/imagem.jpg",
    "stock_quantity": 10
  }'
```

#### Listar produtos:

```bash
curl "http://localhost:8000/api/v1/products/?skip=0&limit=10"
```

#### Filtrar por categoria:

```bash
curl "http://localhost:8000/api/v1/products/?category=Seda"
```

## 🗄️ Modelo de Dados

### Produto (Product)

| Campo          | Tipo     | Descrição                        |
| -------------- | -------- | -------------------------------- |
| id             | Integer  | ID único (chave primária)        |
| name           | String   | Nome do produto                  |
| category       | String   | Categoria do produto             |
| price          | Float    | Preço numérico                   |
| price_display  | String   | Preço formatado (ex: "R$ 25,00") |
| description    | Text     | Descrição do produto             |
| image_url      | String   | URL da imagem                    |
| stock_quantity | Integer  | Quantidade em estoque            |
| is_active      | Boolean  | Se o produto está ativo          |
| created_at     | DateTime | Data de criação                  |
| updated_at     | DateTime | Data de atualização              |

## 🔧 Desenvolvimento

### Executar em modo desenvolvimento:

```bash
uvicorn app.main:app --reload
```

### Recriar banco de dados:

```bash
python scripts/init_db.py
```

## 📝 Notas

- A API está configurada com CORS para aceitar requisições do frontend
- O banco de dados é criado automaticamente na primeira execução
- Os dados de exemplo são inseridos automaticamente
- A API inclui validação de dados e tratamento de erros
- Suporte a paginação e filtros nos endpoints de listagem
