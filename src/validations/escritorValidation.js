import Joi from "joi";

export const escritorSchema = Joi.object({
  nome: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().allow(null, "").optional(),
  biografia: Joi.string().max(1000).allow(null, "").optional(),
  dataNascimento: Joi.date().iso().allow(null, "").optional(),
  dataFalecimento: Joi.date().iso().allow(null, "").optional(),
  foto: Joi.string().uri().allow(null, "").optional()
});
