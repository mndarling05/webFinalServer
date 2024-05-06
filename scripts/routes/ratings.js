const express = require('express')

const{
    getAllRatings,
    getAllContestantRatingsFromUser,
    getAllEpisodeRatingsFromUser,
    addNewUserRating,
    deleteUserRating,
    updateUserContestantRating,
    updateUserEpisodeRating
} = require('../controllers/ratingDataController')

const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

router.use(requireAuth)

//get all ratings
router.get('/', getAllRatings)

//get a users ratings for episodes
router.get('/episodes/:id', getAllEpisodeRatingsFromUser)

//get a users ratings for contestants
router.get('/contestants/:id', getAllContestantRatingsFromUser)

//add user ratings
router.post('/', addNewUserRating)

//delete user ratings
router.delete('/:id', deleteUserRating)

//update a users episode rating
router.patch('/episode/', updateUserEpisodeRating)

//update a users contestant rating
router.patch('/contestant/', updateUserContestantRating)

module.exports = router