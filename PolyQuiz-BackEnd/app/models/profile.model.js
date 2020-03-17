const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Profile', {
  lastName: Joi.string().required(),
  firstName: Joi.string().required(),
  trouble: Joi.string().required(),
  imgURL: Joi.string(),
})