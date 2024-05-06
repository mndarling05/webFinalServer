const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
    },
    episode_ratings: [
        {
            _id: false,
            episode_id: mongoose.Types.ObjectId,
            episode_rating: Number
        }
    ],
    contestant_ratings: [
        {
            _id: false,
            contestant_id: mongoose.Types.ObjectId,
            contestant_rating: Number
        }
    ]
})

module.exports = mongoose.model('Ratings', ratingSchema, 'Ratings')