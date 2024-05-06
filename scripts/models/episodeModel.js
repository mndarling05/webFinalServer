const mongoose = require('mongoose')

const episodeSchema = new mongoose.Schema({
    episode_id: Number,
    title: String,
    air_date: Date,
    synopsis: String,
    judges_panel: [String],
    maxi_challenge: String,
    runway_theme: String,
    lip_sync_song:{
        song: String,
        artist: String
    },
    bottom_two: [String],
    eliminated: String,
    maxi_challenge_winner: String,
    rating: Number
})

module.exports = mongoose.model('Episodes', episodeSchema, 'Episodes')