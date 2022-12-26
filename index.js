import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import ejs from 'ejs';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import authRoute from './routes/authRoute.js';
import connectDB from './settings/connectDB.js';
import authenticateUser from './settings/passportStrategy.js';
import authenticateFacebook from './settings/facebookStrategy.js';
import methodOverride from 'method-override'

const app=express()
const PORT=process.env.PORT || 5000
dotenv.config()
connectDB()
authenticateFacebook(passport)
authenticateUser(passport)
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({mongoUrl:process.env.DATA_URL}),
    cookie:{
        maxAge:1000* 60* 60 * 24
    }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
const checkAuthenticated =(req, res, next)=>{
    if(req.isAuthenticated()){
    return next()
    }
   return res.redirect('/auth/login')    
}
const checkNotAuthenticated=(req, res, next)=>{
    if(req.isAuthenticated()){
    return  res.redirect('/')
    }
   return  next()
}
app.delete('/logout',(req, res)=> {
    req.logOut(()=>{
        res.redirect('/')
    })
})
app.get('/',checkAuthenticated,(req, res)=>{
    console.log(req.user)
    res.render('home',{userName:req.user.username})
    })
app.get('/secret', (req, res)=>res.render('secret'))
app.use('/auth',checkNotAuthenticated ,authRoute)



app.listen(PORT, ()=> console.log(`app is up on port: ${PORT}`))

