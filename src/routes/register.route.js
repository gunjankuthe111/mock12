const express = require("express")
const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const app = express.Router()


app.get("/",(req,res)=>{
    res.status(200).send({message: "Register User"});
})


app.post("/",async(req,res)=>{
    const {name,email,password} = req.body

    try{
        if(!name || !email ||!password){
            return res.send({message: "Missing Details"});
        }

        const isExist = await User.findOne({email})
        if(isExist){
            return res.send({message: "Email already exist"});
        }

        bcrypt.hash(password, 5, async function (err, hash) {
            if(err){
                return res.send(JSON.stringify({message:"Something went wrong"}))
            }else{
                const user = new User({name,email,password:hash})
                await user.save()
                return res.status(201).send({email,name})
            }
        });

    }
    catch(e){
        res.status(404).send({message:e.message});
    }
})
module.exports = app