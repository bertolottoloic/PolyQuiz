const { Router } = require('express')

const { Quiz, Question, Answer } = require('../../models')
const QuestionRouter = require('./questions')

const router = new Router()
router.use('/:quizId/questions', QuestionRouter)

router.get('/', (req, res) => {
  try {
    quizzes = Quiz.get()
    quizzes.forEach(element => {
      questions = addQuestions(element.id)
      questions.forEach( ques => {
        ques.answers = addAnswers(ques.id)
      });
      element.questions = questions
    });
    res.status(200).json(Quiz.get())
  } catch (err) {
    res.status(500).json(err)
  }
})


function addQuestions(quizId){
  questions = []
  try {
    questions = Question.get().filter((ques)=>ques.quizId == quizId)
  } catch (err) {
    res.status(500).json(err)
  }
  return questions
}

function addAnswers(questionId){
  answers = []
  try {
    answers = Answer.get().filter((ans)=>ans.questionId == questionId)
  } catch (err) {
    res.status(500).json(err)
  }
  return answers
}


router.get('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.getById(req.params.quizId))
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
