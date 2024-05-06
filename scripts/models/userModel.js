const mongoose = require('mongoose')
const bcrypt = require('bcrypt') //encrypt and decrypt passwords
const validator = require('validator')

//define a schema that maps to the structure of the data in Mongoose
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type:String,
        required: true
    }
})

//static signup method
userSchema.statics.signup = async function(username, email, password, firstname, lastname) {
    //validate form
    if(!email || !password || !username || !firstname || !lastname){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }   
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }
    //check if username or email already exists
    const existsEmail = await this.findOne({email})
    if(existsEmail) {
        throw Error('Email already in use')
    }
    const existsUsername = await this.findOne({username})
    if(existsUsername){
        throw Error('Username already in use')
    }
    //generate salt and hash
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt) //encrypt password using salt
    
    //create the user with our model
    const user = await this.create({username, email, password:hash, firstname, lastname})

    return user;

}

//static login method
userSchema.statics.login = async function(email, password){
    //validate form
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    //check for existance of user
    const user = await this.findOne({email})
    if(!user){
        throw Error('Incorrect email')
    }
    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect password')
    }
    return user
}
//Use to check if user has correct credentials
userSchema.methods.isValidPassword = async function(formPassword){
    const user = this;
    const hash = user.password; 
    //true if match, false if not
    const compare = await bcrypt.compare(formPassword, hash);
    return compare;
}
module.exports = mongoose.model('User', userSchema, 'Users');