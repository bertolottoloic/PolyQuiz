const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const ProfilesRouter = require('./profiles')
const ThemesRouter = require('./quizzes/themes')
// const StatMemoryRouter = require('./profiles/stats/stat-memory')
// const StatMoteurRouter = require('./profiles/stats/stat-moteur')
// const StatVueRouter = require('./profiles/stats/stat-vue')


const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/profiles', ProfilesRouter)
router.use('/themes', ThemesRouter)
// router.use('/stats/stat-memory', StatMemoryRouter)
// router.use('/stats/stat-moteur', StatMoteurRouter)
// router.use('/stats/stat-vue', StatVueRouter)

module.exports = router
