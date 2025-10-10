#!/bin/bash

# Script de configuração do backend da Tabacaria
echo "🚀 Configurando backend da Tabacaria..."

# Verificar se Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 não encontrado. Por favor, instale o Python 3.8+"
    exit 1
fi

# Verificar se pip está instalado
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 não encontrado. Por favor, instale o pip"
    exit 1
fi

# Criar ambiente virtual
echo "📦 Criando ambiente virtual..."
python3 -m venv venv

# Ativar ambiente virtual
echo "🔧 Ativando ambiente virtual..."
source venv/bin/activate

# Instalar dependências
echo "📚 Instalando dependências..."
pip install -r requirements.txt

# Copiar arquivo de configuração
echo "⚙️  Configurando variáveis de ambiente..."
if [ ! -f .env ]; then
    cp env.example .env
    echo "📝 Arquivo .env criado. Por favor, configure as variáveis de banco de dados."
else
    echo "ℹ️  Arquivo .env já existe."
fi

echo ""
echo "✅ Configuração concluída!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure o arquivo .env com suas credenciais do MySQL"
echo "2. Certifique-se de que o MySQL está rodando"
echo "3. Crie um banco de dados chamado 'tabacaria_db'"
echo "4. Execute: python scripts/init_db.py"
echo "5. Execute: python scripts/run_server.py"
echo ""
echo "🌐 A API estará disponível em: http://localhost:8000"
echo "📖 Documentação: http://localhost:8000/docs"
