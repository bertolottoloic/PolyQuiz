const { Router } = require('express')

const { Profile, Stat } = require('../../models')
const StatRouter = require('./stats')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.use('/:profileId/stats', StatRouter)

router.get('/', (req, res) => {
  try {
    res.status(200).json(Profile.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})


router.get('/:profileId', (req, res) => {
  try {
    res.status(200).json(Profile.getById(req.params.profileId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const profile = Profile.create({ ...req.body })
    res.status(201).json(profile)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:profileId', (req, res) => {
  try {
    Stat.get().filter((stat)=> stat.profileId == req.params.profileId).forEach(stat => {
      Stat.delete(stat.id)
    });
    res.status(200).json(Profile.delete(req.params.profileId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:profileId', (req, res) => {
  try {
    res.status(200).json(Profile.update(req.params.profileId,req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
