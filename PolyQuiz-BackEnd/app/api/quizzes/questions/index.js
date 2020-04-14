const { Router } = require('express')

const { Question } = require('../../../models')
const { Answer } = require('../../../models')

const AnswerRouter = require('./answers')
const { addAnswers,deleteAnswers } = require('../Manage')

const router = new Router({mergeParams: true})
router.use('/:questionId/answers', AnswerRouter)

router.get('/', (req, res) => {
    try {
      questions = Question.get().filter((ques)=>ques.quizId == req.params.quizId)
      questions.forEach(element => {
        element.answers = addAnswers(element.id)
      });
      res.status(200).json(questions)
    } catch (err) {
      res.status(500).json(err)
    }
  })

router.get('/:questionId', (req, res) => {
    try {
      question = Question.getById(req.params.questionId)
      if(question.quizId == req.params.quizId)
        {
        question.answers = addAnswers(question.id)
        res.status(200).json(question)
      }
      else throw Error
    } catch (err) {
      res.status(404).json(err)
    }
  })
  
  router.post('/', (req, res) => {
    try {
      const quizId = parseInt(req.params.quizId, 10)
      let question = Question.create({ text:req.body.text, image: req.body.image, quizId})
      if (req.body.answers && req.body.answers.length > 0) {
        var date = Date.now();
        const answers = req.body.answers.map((answer) => {
          while (date == Date.now());
          answerToCreate = {...answer}
          answerToCreate.questionId = question.id
          Answer.create(answerToCreate)
          date = Date.now()
        })
        question = {...question, answers}
      }
      res.status(201).json(question)
    } catch (err) {
      res.status(500).json(err) 
    }
  })
  
  router.delete('/:questionId', (req, res) => {
    try {
      deleteAnswers(req.params.questionId)
      console.log("question")
      res.status(200).json(Question.delete(req.params.questionId))
    } catch (err) {
      res.status(404).json(err)
    }
  })
  
  router.put('/:questionId', (req, res) => {
    try {
      let answers = req.body.answers
      answers.forEach((answer)=>{
        answer.questionId = parseInt(req.params.questionId,10);
        Answer.update(answer.id,answer);
      })
      res.status(200).json(Question.update(req.params.questionId,req.body))
    } catch (err) {
      res.status(404).json(err)
    }
  })

  module.exports = router