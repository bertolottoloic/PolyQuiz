
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

const deleteQuestionsAndAnswers = (quizId) => {

    try {
        Question.get().filter((ques)=>ques.quizId == quizId).forEach((ques)=>{
            deleteAnswers(ques.id)
            Question.delete(ques.id)
        });
    } catch (error) {
        res.status(404).json(err)
    }
}

const deleteAnswers = (questionId) => {
    try {
        Answer.get().filter((ans)=>ans.questionId == questionId).forEach((ans)=>{
            Answer.delete(ans.id)
        });
    } catch (error) {
        res.status(404).json(err)
    }
}

module.exports = {
    addAnswers,
    addQuestions,
    deleteQuestionsAndAnswers,
    deleteAnswers
}