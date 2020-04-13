const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('StatVue', {
  profileId: Joi.number().required(),
  quizId: Joi.number().required(),
  score: Joi.number().required(),
  time: Joi.number().required(),
  questionsDone: Joi.array().required(),
  nbRightAnswers: Joi.number().required(),
  nbWrongAnswers: Joi.number().required(),
})