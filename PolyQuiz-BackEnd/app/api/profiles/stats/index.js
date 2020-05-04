const { Router } = require('express')

const { Stat } = require('../../../models')
const { addQuiz } = require('../../Manage')

const manageAllErrors = require('../../../utils/routes/error-management')

const router = new Router({mergeParams: true})

router.get('/', (req, res) => {
  try {
    let stats = Stat.get().filter((stat) => stat.profileId == req.params.profileId)
    let statsToSend = []
    stats.forEach((stat) => {
      let quiz = addQuiz(stat.quizId)
      statsToSend.push({...stat, quiz})
    })
    res.status(200).json(statsToSend)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:statId', (req, res) => {
  try {
    let stat = Stat.getById(req.params.statId)
    if(stat.profileId == req.params.profileId)
      res.status(200).json(stat)
    else throw new Error   
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const stats = Stat.create({ ...req.body })
    res.status(201).json(stats)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:statId', (req, res) => {
  try {
    res.status(200).json(Stat.delete(req.params.statId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:statId', (req, res) => {
  try {
    res.status(200).json(Stat.update(req.params.statId,req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router