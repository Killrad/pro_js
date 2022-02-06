import mongoose from 'mongoose';

const Summary = new mongoose.Schema({
    name:{type:String, required: true},
    city:{type:String, required: true},
    profession:{type:String, required: true},
    foto:{type:String, required: true},
    email:{type:String, required: true},
    phone:{type:String, required: true},
    bdate:{type:String, required: true},
    edu:{type:String, required: true},
    skills:{type:String, required: true},
    pay:{type:String, required: true},
    info:{type:String, required: true},
    status:{type:String, required: true},
})

export default mongoose.model('Summaru', Summary);