const { Router } = require('express')

const { Stat } = require('../../../models')
const { addQuiz } = require('../../Manage')


const router = new Router({mergeParams: true})

router.get('/', (req, res) => {
  try {
    stats = Stat.get().filter((stat) => stat.profileId == req.params.profileId)
    statsToSend = []
    stats.forEach((stat) => {
      quiz = addQuiz(stat.quizId)
      statsToSend.push({...stat, quiz})
    })
    res.status(200).json(statsToSend)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:statId', (req, res) => {
  try {
    res.status(200).json(Stat.getById(req.params.statId))
  } catch (err) {
    res.status(404).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const stats = Stat.create({ ...req.body })
    res.status(201).json(stats)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:statId', (req, res) => {
  try {
    res.status(200).json(Stat.delete(req.params.statId))
  } catch (err) {
    res.status(404).json(err)
  }
})

router.put('/:statId', (req, res) => {
  try {
    res.status(200).json(Stat.update(req.params.statId,req.body))
  } catch (err) {
    res.status(404).json(err)
  }
})

module.exports = router