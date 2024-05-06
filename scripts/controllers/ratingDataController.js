const Ratings = require('../models/ratingModel')
const Episode = require('../models/episodeModel')
const Contestant = require('../models/contestantModel')

const mongoose = require('mongoose')

//get all ratings
const getAllRatings = async(req, resp) => {
    const ratings = await Ratings.find()

    resp.status(200).json(ratings)
}
//get all Contestant Ratings
const getAllContestantRatingsFromUser = async(req, resp) => {
    const {id} = req.params 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return resp.status(404).json({error: "No such thing"})
    }

    const user = await Ratings.findOne({user_id:id}) //get user rating profile

    if(!user){
        return resp.status(404).json({error: "No such thing"})
    }

    const contestant_ratings = user.contestant_ratings

    if(!contestant_ratings){
        return resp.status(404).json({error: "No such thing"})
    }
    return resp.status(200).json(contestant_ratings)
}

//get all Episode ratings
const getAllEpisodeRatingsFromUser = async(req, resp) => {
    const {id} = req.params 
    if(!mongoose.Types.ObjectId.isValid(id)){
        console.log('not valid')
        return resp.status(404).json({error: "No such thing"})
    }
    const user = await Ratings.findOne({user_id:id}) //get user rating profile

    if(!user){
        console.log('cant find user')
        return resp.status(404).json({error: "No such thing"})
    }

    const episode_ratings = user.episode_ratings

    if(!episode_ratings){
        console.log('no ratings')
        return resp.status(404).json({error: "No such thing"})
    }
    return resp.status(200).json(episode_ratings)
}

//create a new rating profile for new user
const addNewUserRating = async (req, resp) => {
    const {user_id} = req.body
    console.log("body:", req.body)
    console.log("user:", user_id)

    try{

    if(!mongoose.Types.ObjectId.isValid(user_id)){
        return resp.status(400).json({error: "Invalid"})
    }
    if(!user_id){
        return resp.status(400).json({error: 'Please include user_id'})
    }
    //check if rating profile for user already exists
    const existingRating = await Ratings.findOne({user_id:user_id})
    if(existingRating){
        return resp.status(400).json({error: `Rating profile for user already exists`})
    }
    //add to our collection

    const newRating = await Ratings.create({
        user_id: user_id,
        episode_ratings: [],
        contestant_ratings: []
    })

    console.log("New rating created:", newRating)
    resp.status(200).json(newRating)
    } catch(error){
        return resp.status(400). json({error: error.message})
    }
}

//delete a rating
const deleteUserRating = async (req, resp) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such thing'})
    }

    const rating = await Ratings.findOneAndDelete({_id:id})

    if(!rating){
        return resp.status(400).json({error: 'No such thing'})
    }
    resp.status(200).json(rating)
}

//update an existing episode rating or add new rating
const updateUserEpisodeRating = async (req, resp) => {
    const{userId, episodeId, episodeRating} = req.body

    console.log("id:", userId)
    console.log("episodeId:", episodeId)
    console.log("episodeRating:", episodeRating)

    if(!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(episodeId)){
        return resp.status(400).json({error: "No such thing"})
    } 

    try{
        //update existing episode_rating
        const existingRating = await Ratings.findOneAndUpdate(
            {user_id:userId, 'episode_ratings.episode_id':episodeId},
            {$set: {'episode_ratings.$.episode_rating':episodeRating}})

        if(!existingRating){
            //add a new episode_rating
            const rating = await Ratings.findOneAndUpdate(
                {user_id:userId},
                {$push: {episode_ratings: 
                    {   episode_id: episodeId,
                        episode_rating: episodeRating}
                }})

            if(!rating){
                return resp.status(400).json({error: 'No such thing'})
            }
            averageEpisodeRatings() //calculate new average
            return resp.status(200).json(rating)
        }
        else{
            averageEpisodeRatings() //calculate new average
            return resp.status(200).json(existingRating)
        }

    }catch(error){
        return resp.status(400).json({error: error.message})
    }
}

//update a contestant rating
const updateUserContestantRating = async(req, resp) => {
    const{userId, contestantId, contestantRating} = req.body

    if(!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(contestantId)){
        return resp.status(400).json({error: "No such thing"})
    } 

    try{
        //update existing episode_rating
        const existingRating = await Ratings.findOneAndUpdate(
            {user_id:userId, 'contestant_ratings.contestant_id':contestantId},
            {$set: {'contestant_ratings.$.contestant_rating':contestantRating}})

        if(!existingRating){
            //add a new episode_rating
            const rating = await Ratings.findOneAndUpdate( 
                {user_id:userId},
                {$push: {contestant_ratings: 
                    {   contestant_id: contestantId,
                        contestant_rating: contestantRating}
                }})

            if(!rating){
                return resp.status(400).json({error: 'No such thing'})
            }
            await averageContestantRatings() //calculate new average
            return resp.status(200).json(rating)
        }
        else{
            await averageContestantRatings() //calculate new average
            return resp.status(200).json(existingRating)
        }
    }catch(error){
        return resp.status(400).json({error: error.message})
    }
}

//calculates and updates ratings in Episodes collection
const averageEpisodeRatings = async () => {
    try{
        const aggregateResult = await Ratings.aggregate([
            {$unwind: '$episode_ratings'},
            {
                $group: {
                    _id: '$episode_ratings.episode_id',
                    averageRating: {$avg: '$episode_ratings.episode_rating'}
                }
            }
        ]);

        await Promise.all(aggregateResult.map(async(result) => {
            const episodeId = result._id
            const average = result.averageRating

            await Episode.findOneAndUpdate(
                {_id: episodeId},
                {rating: average}
            )
        }))
        console.log('Average rating updated')
    } catch (error) {
        console.error({error: error.message})
    }
}

//calculates and updates ratings in Contestants collection ---SOMETHING WRONG FIX!!!!!!
const averageContestantRatings = async () => {
    try{
        const aggregateResult = await Ratings.aggregate([
            {$unwind: '$contestant_ratings'},
            {
                $group: {
                    _id: '$contestant_ratings.contestant_id',
                    averageRating: {$avg: '$contestant_ratings.contestant_rating'}
                }
            }
        ]);

        await Promise.all(aggregateResult.map(async(result) => {
            const contestantId = result._id
            const average = result.averageRating

            await Contestant.findOneAndUpdate(
                {_id: contestantId},
                {contestant_rating: average}
            )
        }))
        console.log('Average rating updated')
    } catch (error) {
        console.error({error: error.message})
    }
}
module.exports = {
    getAllRatings,
    getAllEpisodeRatingsFromUser,
    getAllContestantRatingsFromUser,
    addNewUserRating,
    deleteUserRating,  
    updateUserEpisodeRating,
    updateUserContestantRating

}