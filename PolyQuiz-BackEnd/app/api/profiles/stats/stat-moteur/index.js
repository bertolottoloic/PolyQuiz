const { Router } = require('express')

const { StatMoteur } = require('../../../../models')


const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(StatMoteur.get())
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:statId', (req, res) => {
  try {
    res.status(200).json(StatMoteur.getById(req.params.statId))
  } catch (err) {
    res.status(404).json(err)
  }
})

router.get('/p/:profileId', (req, res) => {
  try {
    res.status(200).json(StatMoteur.get().filter((stat) => stat.profileId == req.params.profileId))
  } catch (err) {
    res.status(404).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    console.log(req.body)
    const stats = StatMoteur.create({ ...req.body })
    console.log(stats)
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
    res.status(200).json(StatMoteur.delete(req.params.statId))
  } catch (err) {
    res.status(404).json(err)
  }
})

router.put('/:statId', (req, res) => {
  try {
    res.status(200).json(StatMoteur.update(req.params.statId,req.body))
  } catch (err) {
    res.status(404).json(err)
  }
})

module.exports = router