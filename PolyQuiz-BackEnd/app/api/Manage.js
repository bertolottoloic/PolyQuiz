const { Quiz } = require('../models')
const { Question } = require('../models')
const { Answer } = require('../models')
const { Theme } = require('../models')

const addQuiz = (id) => {
    let quiz
    try{
        quiz = {...Quiz.getById(id)}
        quiz.questions = addQuestions(id);
        quiz.theme = addThemes(quiz.themeId);
    } catch(err) {
        res.status(500).json(err);
    }
    return quiz;
}

const addQuestions = (quizId) => {
    questions = []
    try {
        Question.get().filter((ques)=>ques.quizId == quizId).forEach(ques => {
            nQues = {...ques,answers:addAnswers(ques.id)}
            questions.push(nQues)
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

const addThemes = (themeId) => {
    theme=null;
    try {
        theme = Theme.get().find((ques)=>ques.id == themeId)
    
    } catch (err) {
        res.status(500).json(err)
    }
    return theme;
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
    addQuiz,
    addAnswers,
    addQuestions,
    deleteQuestionsAndAnswers,
    deleteAnswers,
    addThemes,
}