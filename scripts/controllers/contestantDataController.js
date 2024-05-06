const Contestants = require('../models/contestantModel')

const mongoose = require('mongoose')

const findAllContestants = async(req, resp) => {
        const contestants = await Contestants.find()

        resp.status(200).json(contestants)
}

const findByContestant = async(req, resp) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return resp.status(404).json({error: 'No such thing'})
    }

    const contestant = await Contestants.find({_id:id})

    if(!contestant){
        return resp.status(404).json({error: 'No such thing'}) 
    }
    resp.status(200).json(contestant)
}

const updateContestant = async(req, resp) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return resp.status(404).json({error: 'No such thing'})
    }

    const contestant = await Contestants.findOneAndUpdate({_id:id}, {
        ...req.body
    })

    if(!contestant){
        return resp.status(404).json({error: 'No such thing'}) 
    }
    resp.status(200).json(contestant)   
}

module.exports = {
    findAllContestants,
    findByContestant,
    updateContestant
}