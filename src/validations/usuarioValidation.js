import Joi from "joi";

export const usuarioSchema = Joi.object({
  nome: Joi.string().min(2).max(100).required(),
  nomeUsuario: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).max(100).required(),
  nascimento: Joi.number().integer().required(),
  idade: Joi.number().integer().min(0).required(),
  tipo: Joi.string().valid("NORMAL", "ESCRITOR").required(),
  foto: Joi.string().uri().allow(null, "").optional()
});
