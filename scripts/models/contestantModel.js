const mongoose = require('mongoose')
const validator = require('validator')

//define a schema that maps to the structure of the data in Mongoose
const contestantSchema = new mongoose.Schema({
    contestant_id: Number,
    contestant_name: String,
    track_record:
    {
        episodes_won: Number,
        position: Number,
        episode_eliminated: String
    },
    contestant_rating: Number
})

module.exports = mongoose.model('Contestants', contestantSchema, 'Contestants')