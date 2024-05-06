const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')

//creating a token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1h'})
}
//login user
const loginUser = async(req, resp) => {
    const {email, password} = req.body
    let {id, username, firstname, lastname} = ''
    try{
        const user = await User.login(email, password)

        if(user){
            id = user._id
            username = user.username
            firstname = user.firstname
            lastname = user.lastname
        }
        const token = createToken(user._id)

        resp.status(200).json({email, token, id, username, firstname, lastname})

    }catch(error){
        resp.status(400).json({error: error.message})
    }
}
//signup user
const signupUser = async(req, resp) => {
    const {username, email, password, firstname, lastname} = req.body

    try{
        const user = await User.signup(username, email, password, firstname, lastname)

        const token = createToken(user._id)

        const id = user._id

        resp.status(200).json({email, id, token, username, firstname, lastname})

    }catch(error){
        resp.status(400).json({error: error.message})
    }
}

module.exports = {
    loginUser,
    signupUser
}
