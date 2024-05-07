const express = require('express')

const{
    getAllContestantRatingsFromUser,
    getAllEpisodeRatingsFromUser,
    addNewUserRating,
    deleteUserRating,
    updateUserContestantRating,
    updateUserEpisodeRating
} = require('../controllers/ratingDataController')

const requireAuth = require('../middleware/requireAuth')
const router = express.Router()


//get a users ratings for episodes
router.get('/episodes/:id', requireAuth, getAllEpisodeRatingsFromUser)

//get a users ratings for contestants
router.get('/contestants/:id', requireAuth, getAllContestantRatingsFromUser)

//add user ratings
router.post('/', addNewUserRating)

//delete user ratings
router.delete('/:id', requireAuth, deleteUserRating)

//update a users episode rating
router.patch('/episode/', requireAuth, updateUserEpisodeRating)

//update a users contestant rating
router.patch('/contestant/', requireAuth, updateUserContestantRating)

module.exports = router