const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('stat-memory', {
  profileId: Joi.number().required(),
  quizId: Joi.number().required(),
  score: Joi.number().required(),
  time: Joi.number().required(),
  trial: Joi.object().pattern(Joi.number(), Joi.number()),
  questionsDone: Joi.array().required(),
  nbRightAnswers: Joi.number().required(),
  nbWrongAnswers: Joi.number().required(),
})