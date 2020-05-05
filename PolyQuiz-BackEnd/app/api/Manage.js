const { Quiz } = require('../models')
const { Question } = require('../models')
const { Answer } = require('../models')
const { Theme } = require('../models')
const fs = require('fs')

const manageAllErrors = require('../utils/routes/error-management')

const addQuiz = (id) => {
  let quiz
  let quizToSend
  try {
    quiz = { ...Quiz.getById(id) }
    quizToSend = { id: quiz.id, name: quiz.name, trouble: quiz.trouble }
    const theme = addThemes(quiz.themeId)
    quizToSend.theme = { name: theme.name }
  } catch (err) {
    manageAllErrors(res,err)
  }
  return quizToSend
}

const addQuestions = (quizId) => {
  let questions = []
  try {
    Question.get().filter((ques) => ques.quizId == quizId).forEach((ques) => {
      let nQues = { ...ques, answers: addAnswers(ques.id) }
      questions.push(nQues)
    })
  } catch (err) {
    manageAllErrors(res,err)
  }
  return questions
}

const addAnswers = (questionId) => {
  let answers = []
  try {
    answers = Answer.get().filter((ans) => ans.questionId == questionId)
  } catch (err) {
    manageAllErrors(res,err)
  }
  return answers
}

const addThemes = (themeId) => {
  let theme = null
  try {
    theme = Theme.get().find((ques) => ques.id == themeId)
  } catch (err) {
    manageAllErrors(res,err)
  }
  return theme
}

const deleteQuestionsAndAnswers = (quizId) => {
  try {
    Question.get().filter((ques) => ques.quizId == quizId).forEach((ques) => {
      deleteAnswers(ques.id)
      deleteAttachedImg(ques.image)
      Question.delete(ques.id)
    })
  } catch (error) {
    manageAllErrors(res,err)
  }
}

const deleteAnswers = (questionId) => {
  try {
    Answer.get().filter((ans) => ans.questionId == questionId).forEach((ans) => {
      deleteAttachedImg(ans.image)
      Answer.delete(ans.id)
    })
  } catch (error) {
    manageAllErrors(res,err)
  }
}

const deleteAttachedImg = (image) => {
  if(image!=''){
    let line = image.split('/')
    fs.unlink(__dirname + '../../../assets/'+line[line.length-1], function(error) {
        if (error) {
            throw error;
        }
        console.log('Deleted '+line[line.length-1]+'!!');
    });
  }
}

module.exports = {
  addQuiz,
  addAnswers,
  addQuestions,
  deleteQuestionsAndAnswers,
  deleteAnswers,
  addThemes,
  deleteAttachedImg
}
