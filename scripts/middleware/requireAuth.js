const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async(req, resp, next) => {
    //verify authorization

    const {authorization} = req.headers

    if(!authorization){
        return resp.status(401).json({error: 'Auth token required'})
    }

    //Bearer [jwt]
    const token = authorization.split(' ')[1]

    try{

        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({_id}).select('_id')
        next()

    } catch(error){
        console.log(error)
        resp.status(401).json({error: 'Request not authorized'})
    }
}
 module.exports = requireAuth