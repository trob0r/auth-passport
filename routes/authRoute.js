import express from 'express';
import passport from 'passport'
const authRoute=express.Router()

import { register, login } from '../controllers/authController.js';

authRoute.get('/register', (req, res)=>{
  res.render('register')
})
authRoute.post('/register', register)
authRoute.get('/login', (req, res)=>res.render('login'))
authRoute.post('/login', passport.authenticate('local',{
  successRedirect:"/",
  failureRedirect:"/login",   
}))

authRoute.get('/facebook', passport.authenticate('facebook', {scope:['email', 'user_friends', 'manage_pages']}) )
authRoute.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect:'/',
  failureRedirect:'/auth/login'
}))

export default authRoute;
