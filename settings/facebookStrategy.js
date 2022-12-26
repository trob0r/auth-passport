import dotenv from 'dotenv'; dotenv.config()
import _fbStrategy from 'passport-facebook'
import User from '../models/User.js'

const fbStrategy=_fbStrategy.Strategy

const customFields={
    clientID:process.env.FACEBOOK_APP_ID,
    clientSecret:process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:5000/auth/facebook/callback',
    
}
const verifyCallback=(accessToken, refreshToken, profile, done)=>{
    User.findOne({uid:profile.id})
    .then((user)=>{
        if(user){
        return  done(null, user)            
        }else{
            const newUser= new User()
            newUser.uid = profile.id
            newUser.username = profile.displayName
            newUser.email = profile.email          
            newUser.save((err)=>console.log(err))
            return done(null, newUser)
        }
        
    })
    .catch(err => done(null, err))
}

export default function authenticateFacebook(passport){
    passport.use(new fbStrategy( customFields, verifyCallback ))
    passport.serializeUser((user, done)=> done(null, user.id))
    passport.deserializeUser((id, done)=> User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err))
    )    
}