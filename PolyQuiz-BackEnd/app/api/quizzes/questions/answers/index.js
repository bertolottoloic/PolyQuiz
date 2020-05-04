const { Router } = require('express')

const { Answer } = require('../../../../models')

const manageAllErrors = require('../../../../utils/routes/error-management')

const router = new Router({mergeParams: true})

router.get('/', (req, res) => {
    try {
      res.status(200).json(Answer.get().filter((ans)=>ans.questionId == req.params.questionId))
    } catch (err) {
      manageAllErrors(res, err)
    }
  })

router.get('/:answerId', (req, res) => {
    try {
      if(Answer.getById(req.params.answerId).questionId == req.params.questionId)
        res.status(200).json(Answer.getById(req.params.answerId))
      else throw Error
    } catch (err) {
      manageAllErrors(res, err)
    }
  })
  
  router.post('/', (req, res) => {
    try {
      const answer = Answer.create({ ...req.body, questionId: req.params.questionId })
      res.status(201).json(answer)
    } catch (err) {
      manageAllErrors(res, err)
    }
  })
  
  router.delete('/:answerId', (req, res) => {
    try {
      res.status(200).json(Answer.delete(req.params.answerId))
    } catch (err) {
      manageAllErrors(res, err)
    }
  })
  
  router.put('/:answerId', (req, res) => {
    try {
      res.status(200).json(Answer.update(req.params.answerId,req.body))
    } catch (err) {
      manageAllErrors(res, err)
    }
  })

  module.exports = router