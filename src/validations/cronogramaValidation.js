import Joi from "joi";

export const cronogramaSchema = Joi.object({
  data: Joi.date().required().messages({
    'any.required': 'Data é obrigatória',
    'date.base': 'Data deve ser uma data válida'
  }),
  
  titulo: Joi.string().min(1).max(200).required().messages({
    'any.required': 'Título é obrigatório',
    'string.min': 'Título deve ter pelo menos 1 caractere',
    'string.max': 'Título deve ter no máximo 200 caracteres'
  }),
  
  descricao: Joi.string().max(500).optional().allow('', null).messages({
    'string.max': 'Descrição deve ter no máximo 500 caracteres'
  }),
  
  livroId: Joi.number().integer().positive().optional().allow(null).messages({
    'number.base': 'ID do livro deve ser um número',
    'number.integer': 'ID do livro deve ser um número inteiro',
    'number.positive': 'ID do livro deve ser positivo'
  }),
  
  tipo: Joi.string().valid('EVENTO', 'META', 'LEMBRETE').default('EVENTO').messages({
    'any.only': 'Tipo deve ser: EVENTO, META ou LEMBRETE'
  }),
  
  concluido: Joi.boolean().default(false).messages({
    'boolean.base': 'Concluído deve ser verdadeiro ou falso'
  })
});

export const cronogramaUpdateSchema = Joi.object({
  data: Joi.date().optional().messages({
    'date.base': 'Data deve ser uma data válida'
  }),
  
  titulo: Joi.string().min(1).max(200).optional().messages({
    'string.min': 'Título deve ter pelo menos 1 caractere',
    'string.max': 'Título deve ter no máximo 200 caracteres'
  }),
  
  descricao: Joi.string().max(500).optional().allow('', null).messages({
    'string.max': 'Descrição deve ter no máximo 500 caracteres'
  }),
  
  livroId: Joi.number().integer().positive().optional().allow(null).messages({
    'number.base': 'ID do livro deve ser um número',
    'number.integer': 'ID do livro deve ser um número inteiro',
    'number.positive': 'ID do livro deve ser positivo'
  }),
  
  tipo: Joi.string().valid('EVENTO', 'META', 'LEMBRETE').optional().messages({
    'any.only': 'Tipo deve ser: EVENTO, META ou LEMBRETE'
  }),
  
  concluido: Joi.boolean().optional().messages({
    'boolean.base': 'Concluído deve ser verdadeiro ou falso'
  })
}).min(1).messages({
  'object.min': 'Pelo menos um campo deve ser fornecido para atualização'
});