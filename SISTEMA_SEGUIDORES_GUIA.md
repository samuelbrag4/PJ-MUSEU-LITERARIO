# 📱 **SISTEMA DE SEGUIDORES - ESTILO INSTAGRAM**

## 🎯 **FUNCIONALIDADES IMPLEMENTADAS**

### **✅ Sistema Completo de Seguir Escritores**
- Seguir/deixar de seguir escritores
- Lista de escritores que o usuário segue
- Lista de seguidores de um escritor
- Verificar se usuário segue um escritor
- Rankings e estatísticas
- Proteção contra seguir o mesmo escritor duas vezes

---

## 🛠️ **ROTAS DISPONÍVEIS**

### **🔒 ROTAS PROTEGIDAS (Precisam de Token)**

#### **1. Seguir um Escritor**
```http
POST /seguidores/seguir/:escritorId
Authorization: Bearer {seu_token}
```

**Exemplo:**
```bash
curl -X POST http://localhost:5000/seguidores/seguir/1 \
  -H "Authorization: Bearer seu_token_aqui"
```

**Resposta de Sucesso:**
```json
{
  "mensagem": "Agora você está seguindo Clarice Lispector!",
  "seguidor": {
    "id": 1,
    "seguidoEm": "2025-09-28T14:05:45.123Z",
    "escritor": {
      "id": 1,
      "nome": "Clarice Lispector",
      "foto": "url_da_foto"
    }
  }
}
```

#### **2. Deixar de Seguir um Escritor**
```http
DELETE /seguidores/deixar-de-seguir/:escritorId
Authorization: Bearer {seu_token}
```

#### **3. Meus Escritores Seguindo**
```http
GET /seguidores/meus-escritores
Authorization: Bearer {seu_token}
```

**Resposta:**
```json
{
  "mensagem": "5 escritores sendo seguidos",
  "total": 5,
  "escritores": [
    {
      "seguidorId": 1,
      "seguidoEm": "2025-09-28T14:05:45.123Z",
      "escritor": {
        "id": 1,
        "nome": "Clarice Lispector",
        "biografia": "Escritora brasileira...",
        "foto": "url_foto",
        "totalLivros": 23,
        "totalSeguidores": 150
      }
    }
  ]
}
```

#### **4. Verificar se Sigo um Escritor**
```http
GET /seguidores/verificar/:escritorId
Authorization: Bearer {seu_token}
```

**Resposta:**
```json
{
  "segue": true,
  "seguidoEm": "2025-09-28T14:05:45.123Z"
}
```

#### **5. Minhas Estatísticas**
```http
GET /seguidores/minhas-estatisticas
Authorization: Bearer {seu_token}
```

---

### **🌐 ROTAS PÚBLICAS (Não Precisam de Token)**

#### **6. Seguidores de um Escritor**
```http
GET /seguidores/escritor/:escritorId/seguidores
```

**Resposta:**
```json
{
  "mensagem": "150 seguidores para Clarice Lispector",
  "escritor": {
    "id": 1,
    "nome": "Clarice Lispector",
    "foto": "url_foto"
  },
  "totalSeguidores": 150,
  "seguidores": [
    {
      "seguidorId": 1,
      "seguidoEm": "2025-09-28T14:05:45.123Z",
      "usuario": {
        "id": 1,
        "nome": "João Silva",
        "nomeUsuario": "joao_silva",
        "foto": "url_foto"
      }
    }
  ]
}
```

#### **7. Ranking de Escritores Mais Seguidos**
```http
GET /seguidores/ranking?limite=10
```

**Resposta:**
```json
{
  "mensagem": "Top 10 escritores mais seguidos",
  "ranking": [
    {
      "posicao": 1,
      "id": 1,
      "nome": "Clarice Lispector",
      "biografia": "Escritora brasileira...",
      "foto": "url_foto",
      "totalSeguidores": 150,
      "totalLivros": 23
    }
  ]
}
```

#### **8. Escritores que um Usuário Segue (Público)**
```http
GET /seguidores/usuario/:usuarioId/seguindo
```

#### **9. Estatísticas de um Usuário (Público)**
```http
GET /seguidores/usuario/:usuarioId/estatisticas
```

---

## 🧪 **COMO TESTAR**

### **1. Primeiro, Faça Login para Obter o Token:**
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "normal@teste.com",
    "senha": "senha123"
  }'
```

### **2. Use o Token nas Rotas Protegidas:**
```bash
# Seguir Clarice Lispector (ID: 2)
curl -X POST http://localhost:5000/seguidores/seguir/2 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# Ver quem você está seguindo
curl -X GET http://localhost:5000/seguidores/meus-escritores \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# Ver ranking de escritores mais seguidos
curl -X GET http://localhost:5000/seguidores/ranking
```

---

## 📊 **FUNCIONALIDADES DO FRONTEND**

### **Para o seu Frontend, você pode:**

1. **📱 Feed de Escritores** - Listar todos com botão "Seguir/Seguindo"
2. **👥 Lista de Seguindo** - Mostrar escritores que o usuário segue
3. **📈 Perfil do Escritor** - Mostrar número de seguidores e lista
4. **🏆 Ranking** - Top escritores mais seguidos
5. **📊 Estatísticas** - Dashboard com números de seguidos/seguidores
6. **🔔 Notificações** - Quando alguém segue um escritor

### **Estados do Botão Seguir:**
```javascript
// No frontend, você pode verificar:
const [seguindo, setSeguindo] = useState(false);

// Ao carregar a página:
useEffect(() => {
  fetch(`/seguidores/verificar/${escritorId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => setSeguindo(data.segue));
}, []);

// Função para seguir/deixar de seguir:
const toggleSeguir = async () => {
  const endpoint = seguindo ? 'deixar-de-seguir' : 'seguir';
  const method = seguindo ? 'DELETE' : 'POST';
  
  await fetch(`/seguidores/${endpoint}/${escritorId}`, {
    method,
    headers: { Authorization: `Bearer ${token}` }
  });
  
  setSeguindo(!seguindo);
};
```

---

## 🗄️ **ESTRUTURA DO BANCO DE DADOS**

### **Tabela: seguidores**
```sql
- id (PRIMARY KEY)
- usuarioId (FK -> usuarios.id)
- escritorId (FK -> escritores.id) 
- seguidoEm (DATETIME)
- UNIQUE(usuarioId, escritorId) -- Impede seguir duas vezes
```

### **Relacionamentos Criados:**
- `Usuario.escritoresSeguindo` -> Lista de escritores que segue
- `Escritor.seguidores` -> Lista de usuários que seguem
- Cascata de deletions (se deletar usuário/escritor, remove seguidores)

---

## 🎉 **ESTÁ TUDO PRONTO!**

✅ **23 obras da Clarice Lispector** adicionadas  
✅ **Sistema completo de seguidores** tipo Instagram  
✅ **7 escritores brasileiros** no banco  
✅ **43 livros** catalogados  
✅ **Rotas públicas e protegidas**  
✅ **Prevenção de seguir duplicado**  
✅ **Rankings e estatísticas**  

**Agora seu frontend pode implementar:**
- Feed de escritores com botão seguir
- Lista de "Meus Escritores"
- Perfis com contadores de seguidores
- Rankings dos mais seguidos
- Notificações e interações sociais

🚀 **Seu Museu Literário está completo e com funcionalidades de rede social!**