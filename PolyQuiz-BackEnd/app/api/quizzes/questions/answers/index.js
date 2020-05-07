const { Router } = require('express')

const { Answer } = require('../../../../models')

const { deleteAttachedImg, addImage } = require('../../../Manage')

const manageAllErrors = require('../../../../utils/routes/error-management')

const router = new Router({mergeParams: true})

router.get('/', (req, res) => {
    try {
      const answers = []
      Answer.get().filter((ans)=>ans.questionId == req.params.questionId).forEach(ans => {
        let answer = {...ans}
        answer.image = addImage(answer.image)
        answers.push(answer)
      })
      res.status(200).json(answers)
    } catch (err) {
      manageAllErrors(res, err)
    }
  })

router.get('/:answerId', (req, res) => {
    try {
      const answer = {...Answer.getById(req.params.answerId)}
      if(answer.questionId == req.params.questionId){
        answer.image = addImage(answer.image)
        res.status(200).json(answer)
      }
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
      deleteAttachedImg(Answer.getById(req.params.answerId).image)
      res.status(200).json(Answer.delete(req.params.answerId))
    } catch (err) {
      manageAllErrors(res, err)
    }
  })
  
  router.put('/:answerId', (req, res) => {
    try {
      const answer = Answer.getById(req.params.answerId)
      const line = req.body.image.split('/')
      req.body.image = line[line.length-1]
      if(answer.image!=req.body.image) deleteAttachedImg(answer.image)
      res.status(200).json(Answer.update(req.params.answerId,req.body))
    } catch (err) {
      manageAllErrors(res, err)
    }
  })

  module.exports = router