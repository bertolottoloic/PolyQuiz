const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Answer', {
  text: Joi.string().required(),
  isCorrect: Joi.bool().required(),
  display: Joi.string(),
  questionId: Joi.number(),
  image: Joi.string()
})