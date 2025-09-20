import Joi from "joi";

export const escritorSchema = Joi.object({
  nome: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().allow(null, ""),
  biografia: Joi.string().max(1000).allow(null, ""),
  dataNascimento: Joi.date().iso().allow(null, ""),
  dataFalecimento: Joi.date().iso().allow(null, ""),
  foto: Joi.string().uri().allow(null, "")
});
