import Joi from "joi";

export const favoritoSchema = Joi.object({
  usuarioId: Joi.number().integer().required(),
  livroId: Joi.number().integer().required(),
  status: Joi.string().valid("LENDO", "VOU_LER", "LIDO").required()
});
