const express = require('express')

const {findAllContestants, findByContestant, updateContestant} = require('../controllers/contestantDataController')

const router = express.Router()

//get all contestants
router.get('/', findAllContestants)

//get single contestant
router.get('/:id', findByContestant)

//update contestant
router.patch('/:id', updateContestant)

module.exports = router