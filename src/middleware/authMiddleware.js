import jwt from "jsonwebtoken";

const DEBUG = process.env.DEBUG === 'true';
const JWT_SECRET = process.env.JWT_SECRET || "museu_literario_jwt_secret_2025_muito_seguro";

function log(message, type = 'info') {
  if (!DEBUG && type === 'debug') return;
  const timestamp = new Date().toISOString();
  const prefix = { info: '🔵', debug: '🐛', warning: '⚠️', error: '❌' }[type] || '📝';
  console.log(`${prefix} [AUTH] ${message}`);
}

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    log(`Token não fornecido - ${req.method} ${req.path}`, 'warning');
    return res.status(401).json({ 
      error: "Token não fornecido",
      message: "Acesso negado. Token de autenticação necessário."
    });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    log(`Token mal formatado - ${req.method} ${req.path}`, 'warning');
    return res.status(401).json({ 
      error: "Token mal formatado",
      message: "Formato esperado: Bearer [token]"
    });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    log(`Esquema de token inválido - ${req.method} ${req.path}`, 'warning');
    return res.status(401).json({ 
      error: "Token mal formatado",
      message: "Esquema deve ser Bearer"
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    req.user = { 
      id: decoded.id,
      email: decoded.email,
      tipo: decoded.tipo
    };
    
    log(`Usuário autenticado: ID ${decoded.id} - ${req.method} ${req.path}`, 'debug');
    return next();
  } catch (err) {
    log(`Token inválido: ${err.message} - ${req.method} ${req.path}`, 'error');
    return res.status(401).json({ 
      error: "Token inválido",
      message: "Token expirado ou inválido. Faça login novamente."
    });
  }
};

export default authMiddleware;