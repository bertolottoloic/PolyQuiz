const { Router } = require('express')

const { Question } = require('../../../models')
const { Answer } = require('../../../models')

const AnswerRouter = require('./answers')
const { addAnswers, deleteAnswers, deleteAttachedImg } = require('../../Manage')

const manageAllErrors = require('../../../utils/routes/error-management')

const router = new Router({ mergeParams: true })
router.use('/:questionId/answers', AnswerRouter)

router.get('/', (req, res) => {
  try {
    let questions = Question.get().filter((ques) => ques.quizId == req.params.quizId)
    questions.forEach((element) => {
      element.answers = addAnswers(element.id)
    })
    res.status(200).json(questions)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    let question = Question.getById(req.params.questionId)
    if (question.quizId == req.params.quizId) {
      question.answers = addAnswers(question.id)
      res.status(200).json(question)
    } else throw Error
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const quizId = parseInt(req.params.quizId, 10)
    let question = Question.create({
      text: req.body.text, image: req.body.image, quizId, answersAreText: req.body.answersAreText,
    })
    if (req.body.answers && req.body.answers.length > 0) {
      let date = Date.now()
      const answers = req.body.answers.map((answer) => {
        while (date == Date.now());
        let answerToCreate = { ...answer }
        answerToCreate.questionId = question.id
        Answer.create(answerToCreate)
        date = Date.now()
      })
      question = { ...question, answers }
    }
    res.status(201).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    deleteAnswers(req.params.questionId)
    console.log("before img")
    deleteAttachedImg(Question.getById(req.params.questionId).image)    
    console.log('after deleteImg')
    res.status(200).json(Question.delete(req.params.questionId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:questionId', (req, res) => {
  try {
    const question = Question.getById(req.params.questionId)
    if(question.image!=req.body.image) deleteAttachedImg(question.image)
    const { answers } = req.body
    answers.forEach((answer) => {
      if(Answer.getById(answer.id).image != answer.image) deleteAttachedImg(Answer.getById(answer.id).image)
      answer.questionId = parseInt(req.params.questionId, 10)
      Answer.update(answer.id, answer)
    })
    res.status(200).json(Question.update(req.params.questionId, {
      text: req.body.text, answersAreText: req.body.answersAreText, image: req.body.image, quizId: req.params.quizId,
    }))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
