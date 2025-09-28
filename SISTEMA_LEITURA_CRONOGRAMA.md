# 📚 Sistema de Leitura e Cronograma - API

## 🚀 Novas Funcionalidades Implementadas

### 1. 📖 **Sistema de Status de Leitura nos Favoritos**

#### Funcionalidades:
- **Status de Leitura**: QUERO_LER, LENDO, JA_LI
- **Progresso**: Acompanhamento de páginas lidas (0-100)
- **Datas**: Data de início e término de leitura
- **Estatísticas**: Contadores automáticos por status

#### Rotas Atualizadas:

##### GET `/api/favoritos/meus/favoritos`
```json
// Query params opcionais:
// ?statusLeitura=LENDO
// ?genero=Romance

// Resposta:
{
  "total": 15,
  "estatisticas": {
    "queroLer": 8,
    "lendo": 4,
    "jaLi": 3,
    "total": 15
  },
  "favoritos": [
    {
      "id": 1,
      "livro": {
        "id": 5,
        "titulo": "Dom Casmurro",
        "genero": "Romance",
        "imagem": "https://ui-avatars.com/api/?name=Dom+Casmurro&background=8B4513&color=FFF&size=400",
        "autor": {
          "id": 1,
          "nome": "Machado de Assis"
        }
      },
      "statusLeitura": "LENDO",
      "progresso": 45,
      "dataInicio": "2025-09-20T00:00:00.000Z",
      "dataTermino": null,
      "isFavorito": true
    }
  ]
}
```

##### PATCH `/api/favoritos/status/:livroId`
```json
// Atualizar status de leitura
// Body:
{
  "statusLeitura": "LENDO",
  "progresso": 75,
  "dataInicio": "2025-09-20",
  "dataTermino": null
}

// Resposta:
{
  "message": "Status de leitura atualizado com sucesso! 📖",
  "favorito": { /* dados atualizados */ }
}
```

---

### 2. 📅 **Sistema de Cronograma de Leitura**

#### Funcionalidades:
- **Calendário Personalizado**: Eventos por data
- **Tipos de Evento**: EVENTO, META, LEMBRETE
- **Vinculação com Livros**: Opcional
- **Status**: Concluído/Pendente

#### Rotas do Cronograma:

##### GET `/api/cronograma/meus`
```json
// Query params opcionais:
// ?mes=10&ano=2025

// Resposta:
[
  {
    "id": 1,
    "data": "2025-10-15T00:00:00.000Z",
    "titulo": "Terminar Dom Casmurro",
    "descricao": "Hoje é pra eu terminar o livro",
    "tipo": "META",
    "concluido": false,
    "livro": {
      "id": 5,
      "titulo": "Dom Casmurro",
      "genero": "Romance",
      "imagem": "https://ui-avatars.com/api/?name=Dom+Casmurro&background=8B4513&color=FFF&size=400"
    }
  }
]
```

##### POST `/api/cronograma`
```json
// Criar evento no calendário
// Body:
{
  "data": "2025-10-20",
  "titulo": "Começar O Cortiço",
  "descricao": "Iniciar leitura do próximo livro",
  "livroId": 8,
  "tipo": "EVENTO"
}

// Resposta:
{
  "id": 2,
  "titulo": "Começar O Cortiço",
  "data": "2025-10-20T00:00:00.000Z",
  "concluido": false,
  "livro": { /* dados do livro */ }
}
```

##### PUT `/api/cronograma/:id`
```json
// Atualizar evento
{
  "titulo": "Novo título",
  "descricao": "Nova descrição",
  "concluido": true
}
```

##### PATCH `/api/cronograma/:id/toggle`
```json
// Alternar status de conclusão
// Resposta:
{
  "id": 1,
  "concluido": true,
  "titulo": "Terminar Dom Casmurro"
}
```

##### DELETE `/api/cronograma/:id`
```json
// Deletar evento
{
  "message": "Evento deletado com sucesso"
}
```

---

## 🎯 **Casos de Uso para o Frontend**

### 1. **Página de Favoritos**
```javascript
// Buscar favoritos por categoria
GET /api/favoritos/meus/favoritos?statusLeitura=LENDO

// Mostrar estatísticas
{
  "lendo": 4,        // ícone 📖
  "queroLer": 8,     // ícone 📚
  "jaLi": 3          // ícone ✅
}

// Organizar por gênero
GET /api/favoritos/meus/favoritos?genero=Romance
```

### 2. **Ícone de Coração (Toggle)**
```javascript
// Toggle favorito (já implementado)
POST /api/favoritos/toggle/:livroId

// Atualizar status de leitura
PATCH /api/favoritos/status/:livroId
{
  "statusLeitura": "LENDO"
}
```

### 3. **Calendário de Leitura**
```javascript
// Buscar eventos do mês
GET /api/cronograma/meus?mes=10&ano=2025

// Criar evento quando usuário clica no dia
POST /api/cronograma
{
  "data": "2025-10-15",
  "titulo": "Lendo Dom Casmurro",
  "descricao": "Capítulos 5-10"
}

// Marcar como concluído
PATCH /api/cronograma/:id/toggle
```

---

## 📊 **Estrutura do Banco de Dados**

### Tabela: `Favorito` (Atualizada)
```sql
- id: Int (PK)
- usuarioId: Int (FK)
- livroId: Int (FK)
- status: String ("FAVORITO")
- statusLeitura: String ("QUERO_LER" | "LENDO" | "JA_LI")
- progresso: Int (0-100)
- dataInicio: DateTime
- dataTermino: DateTime
- adicionadoEm: DateTime
```

### Tabela: `CronogramaLeitura` (Nova)
```sql
- id: Int (PK)
- usuarioId: Int (FK)
- data: DateTime
- titulo: String
- descricao: String
- livroId: Int (FK - opcional)
- tipo: String ("EVENTO" | "META" | "LEMBRETE")
- concluido: Boolean
- criadoEm: DateTime
```

---

## ✅ **Status da Implementação**

- ✅ Sistema de status de leitura nos favoritos
- ✅ Cronograma de leitura com calendário
- ✅ Estatísticas automáticas de leitura
- ✅ Validações completas (Joi)
- ✅ Logs profissionais em todas as operações
- ✅ Relacionamentos com livros
- ✅ Filtros por status e gênero
- ✅ API pronta para produção

## 🎨 **Para o Frontend**

O sistema está completamente pronto para suportar:

1. **Ícone de Coração**: Use `POST /api/favoritos/toggle/:livroId`
2. **Dropdown de Status**: Use `PATCH /api/favoritos/status/:livroId` 
3. **Calendário Interativo**: Use rotas `/api/cronograma/*`
4. **Estatísticas**: Retornadas automaticamente em `/api/favoritos/meus/favoritos`
5. **Filtros**: Query params para status e gênero

**Tudo funcionando perfeitamente! 🚀💖**