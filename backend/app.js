//const express = require('express')
import mongoose from 'mongoose'
import express from 'express'
import Summary from "./Summary.js";
import cors from 'cors'
const app = express()
const URL_DB = 'mongodb+srv://testapi:test1234@cluster0.g6c8y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const CV = [
    {id:1, name:'2323'},
    {id:2, name:'242424'},
    {id:3, name:'2325252523'},
    {id:4, name:'2322525255253'}
]
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:8080',
        // Allow follow-up middleware to override this CORS for options
        preflightContinue: true,
    }),
);

let x = 0;

app.post('/api/cv/add', ( async (req, res) => {
    try{
    const {name, city, profession, foto, email, phone, bdate, edu, skills, pay, info, status} = req.body
    console.log(name)
    const summary = await Summary.create({name, city, profession, foto, email, phone, bdate, edu, skills, pay, info, status})
    res.status(200).json(summary);}
    catch (e){
        res.status(500).json(e);
    }
}))
app.put('/api/cv/edit/:id', ( async (req, res) => {
    try{
        const sum = req.body
        if(!sum.id){
            req.status(400).json({message:"ID not defined"})
        }
        const summary = await Summary.findBuIdAndUpdate(sum.id,sum,{new:true});
        res.status(200).json(summary);}
    catch (e){
        res.status(500).json(e);
    }
}))

app.get('/api/cv',
    async (req, res) => {
    try{
        let ans = await Summary.find();
        res.status(200).json(ans);

    }
    catch (e){
            res.status(500).json(e);
        }
    });

app.get('/api/cv/:id',
    async (req, res) => {
        try{
            let ans = await Summary.findById(req.params.id);
            if(!req.params.id){
                req.status(400).json({message:"ID not defined"})
            }
            res.status(200).json(ans);
        }
        catch (e){
            res.status(500).json(e);
        }
    });
app.delete('/api/cv/delete/:id', async (req, res) => {
    try{
        if(!req.params.id){
            req.status(400).json({message:"ID not defined"})
        }
        const summary = await Summary.deleteByIdAndDelete(req.params.id)
        res.status(200).json(summary);
    }
    catch (e){
        res.status(500).json(e);
    }
});




app.get('/',(req, res) => {
    res.status(200).json('Сервер работает')
})

async function startApp(){
    try{
        mongoose.connect(URL_DB, {useUnifiedTopology:true, useNewUrlParser: true})
        app.listen(5000,()=> console.log('server has been started on port 5000...'))


    }
    catch (e){
        console.log(e)
    }
}
startApp()

