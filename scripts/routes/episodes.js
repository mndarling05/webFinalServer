const express = require('express')

const {
    findAllEpisodes, 
    findByEpisode, 
    updateEpisode
} = require('../controllers/episodeDataController')

const router = express.Router()

//get all episodes route
router.get('/', findAllEpisodes);

//get a single episode route
router.get('/:id', findByEpisode);

//update episode
router.patch('/:id', updateEpisode)

module.exports = router;