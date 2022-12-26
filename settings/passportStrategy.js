import Local_Strategy from 'passport-local'
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const LocalStrategy=Local_Strategy.Strategy

const customFields ={
    usernameField:'email',
    passwordField:'password',
}

const verifyCallback=(email, password, done)=>{
    User.findOne({email:email})
    .then((user)=>{
        if(!user){
            return done(null, false)
        }else{
            const isValidPassword=bcrypt.compareSync(password, user.password)
            if(!isValidPassword){
                return done(null, false)
            }else{
                return done(null, user)
            }
        }
    })
}

export default function authenticateUser(passport){
    passport.use(new LocalStrategy(customFields, verifyCallback))
    passport.serializeUser((user, done)=> done(null, user.id))
    passport.deserializeUser((id, done)=> User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err))
    ) 
}