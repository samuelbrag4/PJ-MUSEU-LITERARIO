# 🔧 Guia de Configuração - Museu Literário Brasileiro

## 📋 Pré-requisitos
- Node.js 18+ 
- Git
- Editor de código (VS Code recomendado)

## 🚀 Configuração Inicial

### 1. Clone do Projeto
```bash
git clone https://github.com/samuelbrag4/pj-museu-literario-api
cd pj-museu-literario-api
```

### 2. Configuração das Variáveis de Ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas configurações
```

**Arquivo .env:**
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="museu_literario_jwt_secret_2025_muito_seguro"
PORT=5000
UPLOAD_DIR="uploads"
MAX_FILE_SIZE="5242880"
DEBUG=true
NODE_ENV="development"
LOG_LEVEL="info"
```

### 3. Instalação das Dependências
```bash
npm install
```

### 4. Configuração do Banco de Dados
```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev

# Popular banco com dados iniciais
npm run seed
```

### 5. Iniciar o Servidor
```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

## 🐛 Sistema de Logs

### Tipos de Log
- 🔵 **INFO**: Informações gerais
- ✅ **SUCCESS**: Operações bem-sucedidas  
- ⚠️ **WARNING**: Avisos e alertas
- ❌ **ERROR**: Erros e falhas
- 🐛 **DEBUG**: Informações de debug (apenas quando DEBUG=true)

### Logs do Servidor
```
✅ [2025-09-28T15:17:48.493Z] Servidor iniciado na porta 5000
🔵 [2025-09-28T15:17:48.493Z] Acesse: http://localhost:5000
🐛 [2025-09-28T15:17:48.442Z] Debug mode ativo
```

### Logs de Autenticação
```
🔵 [AUTH] Usuário autenticado: ID 1 - GET /livros
⚠️ [AUTH] Token não fornecido - POST /favoritos
❌ [AUTH] Token inválido: jwt expired - GET /usuarios
```

### Logs do Seed
```
🔵 [SEED] Iniciando população do banco de dados...
✅ [SEED] Tabelas limpas com sucesso
🔵 [SEED] Criando escritores brasileiros...
✅ [SEED] População do banco de dados concluída com sucesso!
```

## 🧪 Testando a API

### Usuários de Teste
Após executar `npm run seed`:
- **Email**: `usuario@teste.com` | **Senha**: `senha123` | **Tipo**: NORMAL
- **Email**: `escritor@teste.com` | **Senha**: `senha123` | **Tipo**: ESCRITOR

### Comandos de Teste
```bash
# Testar servidor
curl http://localhost:5000/

# Registrar usuário
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@email.com","senha":"senha123","tipo":"NORMAL"}'

# Fazer login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","senha":"senha123"}'

# Listar livros (público)
curl http://localhost:5000/livros

# Listar escritores (público)
curl http://localhost:5000/escritores
```

## 🎯 Modo Debug

### Ativar Debug
No arquivo `.env`:
```env
DEBUG=true
NODE_ENV="development"
```

### Logs Extras no Modo Debug
- Requisições HTTP detalhadas
- Stack traces completos de erros
- Variáveis de ambiente carregadas
- Queries do banco de dados
- Informações de autenticação JWT

### Desativar Debug (Produção)
```env
DEBUG=false
NODE_ENV="production"
```

## 📁 Estrutura de Arquivos Importante

```
.env.example     # Template de configuração (sempre commitar)
.env            # Configuração real (nunca commitar)
prisma/
  seed.js       # População inicial do banco
  schema.prisma # Modelo do banco de dados
src/
  server.js     # Ponto de entrada com sistema de logs
  middleware/
    authMiddleware.js  # Autenticação com logs
  controllers/  # Controladores com sistema de logs
uploads/        # Pasta para arquivos enviados
```

## 🚨 Resolução de Problemas

### Erro: "Token inválido"
- Verifique se JWT_SECRET no .env está correto
- Token pode estar expirado (24h de duração)

### Erro: "Porta 5000 em uso"
- Altere PORT no arquivo .env
- Ou mate o processo: `taskkill /f /im node.exe` (Windows)

### Erro: "Database locked"
- Feche todas as conexões com o banco
- Reinicie o servidor: `npm run dev`

### Erro: "Prisma not found"
- Execute: `npx prisma generate`
- Reinstale dependências: `npm install`

## 📊 Dados Pré-populados

Após `npm run seed`:
- ✅ **7 escritores** brasileiros
- ✅ **43 livros** (23 de Clarice Lispector)
- ✅ **2 usuários** de teste
- ✅ **Todas as imagens** funcionando

## 🔄 Comandos Úteis

```bash
# Reiniciar banco
npx prisma migrate reset

# Ver banco
npx prisma studio

# Logs em tempo real
tail -f server.log  # Se configurar arquivo de log

# Teste de performance
ab -n 100 -c 10 http://localhost:5000/livros
```

---

🎉 **Projeto configurado com sucesso!** Todos os logs e debug estão funcionando perfeitamente.