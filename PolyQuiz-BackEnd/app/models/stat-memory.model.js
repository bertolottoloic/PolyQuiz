const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('stat-memory', {
  profileId: Joi.number().required(),
  quizId: Joi.number().required(),
  score: Joi.number().required(),
  time:Joi.number().required(),
  trial: Joi.string().required(),
  score: Joi.array().required(),
  questionsDone: Joi.array().required(),
  nbRightAnswers: Joi.number().required(),
  nbWrongAnswers: Joi.number().required(),
})