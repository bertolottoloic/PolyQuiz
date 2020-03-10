const { Router } = require('express')

const { Question } = require('../../../models')

const router = new Router({mergeParams: true})

router.get('/', (req, res) => {
    try {
      res.status(200).json(Question.get().filter((ques)=>ques.quizId == req.params.quizId))
    } catch (err) {
      res.status(500).json(err)
    }
  })

router.get('/:questionId', (req, res) => {
    try {
      if(Question.getById(req.params.questionId).quizId == req.params.quizId)
        res.status(200).json(Question.getById(req.params.questionId))
      else throw Error
    } catch (err) {
      res.status(404).json(err)
    }
  })
  
  router.post('/', (req, res) => {
    try {
      const question = Question.create({ ...req.body })
      res.status(201).json(question)
    } catch (err) {
      if (err.name === 'ValidationError') {
        res.status(400).json(err.extra)
      } else {
        res.status(500).json(err)
      }
    }
  })
  
  router.delete('/:questionId', (req, res) => {
    try {
      res.status(200).json(Question.delete(req.params.questionId))
    } catch (err) {
      res.status(404).json(err)
    }
  })
  
  router.put('/:questionId', (req, res) => {
    try {
      res.status(200).json(Question.update(req.params.questionId,req.body))
    } catch (err) {
      res.status(404).json(err)
    }
  })

  module.exports = router