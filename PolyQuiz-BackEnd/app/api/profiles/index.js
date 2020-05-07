const { Router } = require('express')

const { Profile, Stat } = require('../../models')
const { deleteAttachedImg, addImage } = require('../Manage')
const StatRouter = require('./stats')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.use('/:profileId/stats', StatRouter)

router.get('/', (req, res) => {
  try {
    const profiles = []
    Profile.get().forEach(pro => {
      let profile = {...pro}
      profile.image = addImage(profile.image)
      profiles.push(profile)
    })
    res.status(200).json(profiles)
  } catch (err) {
    manageAllErrors(res, err)
  }
})


router.get('/:profileId', (req, res) => {
  try {
    const profile = {...Profile.getById(req.params.profileId)}
    profile.image = addImage(profile.image)
    res.status(200).json(profile)
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
    deleteAttachedImg(Profile.getById(req.params.profileId).image)
    res.status(200).json(Profile.delete(req.params.profileId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:profileId', (req, res) => {
  try {
    const profile = Profile.getById(req.params.profileId)
    const line = req.body.image.split('/')
    req.body.image = line[line.length-1]
    if(profile.image!=req.body.image) deleteAttachedImg(profile.image)
    res.status(200).json(Profile.update(req.params.profileId,req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
