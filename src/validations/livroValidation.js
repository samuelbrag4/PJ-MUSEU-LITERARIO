import Joi from "joi";

export const livroSchema = Joi.object({
  titulo: Joi.string().min(2).max(100).required(),
  anoLancamento: Joi.number().integer().min(0).required(),
  autorId: Joi.number().integer().allow(null).optional(),
  descricao: Joi.string().min(10).max(1000).required(),
  mediaPreco: Joi.number().min(0).required(),
  imagem: Joi.string().uri().required(),
  genero: Joi.string().min(2).max(50).required(),
  dificuldade: Joi.string().valid("BAIXA", "MEDIA", "ALTA").required(),
  temAdaptacao: Joi.boolean().required(),
  numeroPaginas: Joi.number().integer().min(1).required()
});
