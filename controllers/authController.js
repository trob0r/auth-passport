import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import passport from "passport";
import User from "../models/User.js";
import lPassport from '../settings/passportStrategy.js';



export async function  register(req, res){
    const {name,email,password,phone}=req.body
    User.create({
        username:name,
        email,
        password:bcrypt.hashSync(password,10),
        phone
    })
    .then((user, err)=>{       
        user.save()
        res.redirect('/')       
    }) 
    .catch(err=>console.log(err))   
}

export function login(req, res, next){
    const {username,password}=req.body   
  
    res.redirect('/');
}

export function logout(req, res){
    req.logout()
    res.redirect('/auth/login')
}