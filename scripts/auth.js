const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./User');

//maps passport fields to names of fields in db
const localOpt = {
    emailField: 'email',
    passwordField: 'password'
};

//define strategy for validating login
const strategy = new LocalStrategy(localOpt, async(email, password, done) => {
    try{
        //find user in db associated with email
        const chosenUser = await UserModel.findOne({email: email});

        if(!chosenUser){
            //if user is not found, set flash message
            return done(null, false, {message: 'Email not found'});
        }
        //validate password and make sure it matches bcrypt digest
        //stored in db, if matches return true
        const validate = await chosenUser.isValidPassword(password);

        if(!validate){
            return done(null, false, {message: 'Wrong Password'});
        }
        //send user information to the next middleware
        return done(null, chosenUser, {message: 'Logged in Successfully'});
    }
    catch(error){
        return done(error);
    }
});
//for localLogin, use our strategy to handle user login
passport.user('locallogin', strategy);

passport.serializeUser((user, done) => done(null, user.email));

passport.deserializeUser((email, done) => {
    UserModel.findOne({email: email})
    .then((user) => done(null, user));
});