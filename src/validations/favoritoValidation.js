import Joi from "joi";

export const favoritoSchema = Joi.object({
  usuarioId: Joi.number().integer().required(),
  livroId: Joi.number().integer().required(),
  status: Joi.string().valid("FAVORITO").default("FAVORITO"),
  statusLeitura: Joi.string().valid("QUERO_LER", "LENDO", "JA_LI").default("QUERO_LER")
});

export const statusLeituraSchema = Joi.object({
  statusLeitura: Joi.string().valid("QUERO_LER", "LENDO", "JA_LI").required().messages({
    'any.required': 'Status de leitura é obrigatório',
    'any.only': 'Status deve ser: QUERO_LER, LENDO ou JA_LI'
  }),
  
  progresso: Joi.number().integer().min(0).max(100).optional().messages({
    'number.base': 'Progresso deve ser um número',
    'number.integer': 'Progresso deve ser um número inteiro',
    'number.min': 'Progresso deve ser no mínimo 0',
    'number.max': 'Progresso deve ser no máximo 100'
  }),
  
  dataInicio: Joi.date().optional().messages({
    'date.base': 'Data de início deve ser uma data válida'
  }),
  
  dataTermino: Joi.date().optional().messages({
    'date.base': 'Data de término deve ser uma data válida'
  })
});
