const { Quiz } = require('../models')
const { Question } = require('../models')
const { Answer } = require('../models')
const { Theme } = require('../models')
const fs = require('fs')

const { serverUrl } = require('../server.config')
const manageAllErrors = require('../utils/routes/error-management')

const addQuiz = (id) => {
  let quiz
  let quizToSend
  try {
    quiz = { ...Quiz.getById(id) }
    quizToSend = { id: quiz.id, name: quiz.name, trouble: quiz.trouble }
    const theme = addThemes(quiz.themeId)
    quizToSend.theme = { name: theme.name }
    quizToSend.image = addImage(quizToSend.image)
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
      nQues.image = addImage(nQues.image)
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
    Answer.get().filter((ans) => ans.questionId == questionId).forEach((res) => {
      answer = {...res}
      answer.image = addImage(answer.image)
      answers.push(answer)
    })
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
    fs.unlink(__dirname + '../../../assets/'+image, function(error) {
        if (error) {
            throw error;
        }
        console.log('Deleted '+image+'!!');
    });
  }
}

const addImage = (image) => {
  let imageToSend
  if(image == ""){
    imageToSend = ""
  }
  else {
    imageToSend = serverUrl() + 'assets/' + image; 
  }
  return imageToSend
}

module.exports = {
  addQuiz,
  addAnswers,
  addQuestions,
  deleteQuestionsAndAnswers,
  deleteAnswers,
  addThemes,
  deleteAttachedImg,
  addImage
}
