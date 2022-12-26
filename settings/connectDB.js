import mongoose from 'mongoose';

export default function connectDB(){
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.DATA_URL)
    .then((sucess)=>{
        console.log('db connected')
    })
    .catch((err)=>console.log(err))
}