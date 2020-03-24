
const { Question } = require('../../models')
const { Answer } = require('../../models')

const addQuestions = (quizId) => {
    questions = []
    try {
        questions = Question.get().filter((ques)=>ques.quizId == quizId)
        questions.forEach(ques => {
            ques.answers = addAnswers(ques.id)
        });
    } catch (err) {
        res.status(500).json(err)
    }
    return questions
}

const addAnswers = (questionId) => {
    answers = []
    try {
      answers = Answer.get().filter((ans)=>ans.questionId == questionId)
    } catch (err) {
      res.status(500).json(err)
    }
    return answers
}

module.exports = {
    addAnswers,
    addQuestions
}