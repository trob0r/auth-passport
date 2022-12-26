import mongoose from 'mongoose';

const UserSchema= new mongoose.Schema({
    uid:String,
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        // unique:true,
        // required:true,
        lowerCase:true,
        trim:true
    },
    password:{
        type:String,        
    },
    phone:Number,
        
},{timestamps:true})

const User=mongoose.model('User', UserSchema)
export default User;