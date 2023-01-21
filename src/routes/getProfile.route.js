const express = require("express");
const User = require("../models/user.model");
const middleware = require("../contrllers/middleware");
const app = express.Router();

app.use(middleware)

app.get("/", async(req, res) => {
  try{
    const user = await User.findOne({email:req.userEmail},{password:0})
    res.status(200).send(user);
  }
  catch(e){
    res.status(404).send({message: e.message});
  }
});

module.exports = app;
