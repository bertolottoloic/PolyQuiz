const { Router } = require('express')

const { Quiz, Question, Answer } = require('../../models')
const QuestionRouter = require('./questions')
const { addQuestions, deleteQuestionsAndAnswers,addThemes } = require('./Manage')


const router = new Router()
router.use('/:quizId/questions', QuestionRouter)

router.get('/', (req, res) => {
  try {
    quizzes = Quiz.get()
    quizzes.forEach(element => {
      element.questions = addQuestions(element.id)
      element.theme= addThemes(element.themeId)

    });
    res.status(200).json(quizzes)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    quiz = Quiz.getById(req.params.quizId)
    quiz.questions = addQuestions(quiz.id)
    quiz.theme=addThemes(quiz.themeId)
    res.status(200).json(quiz)
  } catch (err) {
    res.status(404).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({ ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    deleteQuestionsAndAnswers(req.params.quizId)
    res.status(200).json(Quiz.delete(req.params.quizId))
  } catch (err) {
    res.status(404).json(err)
  }
})

router.put('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.update(req.params.quizId,req.body))
  } catch (err) {
    res.status(404).json(err)
  }
})

module.exports = router
