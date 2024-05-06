const Episodes = require('../models/episodeModel')
const mongoose = require('mongoose')

//get all episodes
const findAllEpisodes = async(req, resp) => {
    const episodes = await Episodes.find().sort({episode_id:1})
    resp.status(200).json(episodes)
}

//get single episode
const findByEpisode = async(req, resp) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return resp.status(404).json({error: 'No such thing'})
    }

    const episode = await Episodes.find({_id:id})

    if(!episode){
        return resp.status(404).json({error: 'No such thing'})
    }
    resp.status(200).json(episode)
}

//update a single episode
const updateEpisode = async(req, resp) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return resp.status(404).json({error: 'No such thing'})
    }

    const episode = await Episodes.findOneAndUpdate({_id:id}, {
        ...req.body
    })
    if(!episode){
        return resp.status(404).json({error: 'No such thing'})
    }
    resp.status(200).json(episode)
}

module.exports = {
    findAllEpisodes,
    findByEpisode,
    updateEpisode
}
