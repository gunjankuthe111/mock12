require("dotenv").config();
const express =require("express")
const cors = require("cors");
const connectDB = require("./src/config/db");

const registerRoute = require("./src/routes/register.route")
const loginRoute = require("./src/routes/login.route")
const getProfileRoute = require("./src/routes/getProfile.route")
const calculateRoute = require("./src/routes/calculate.route")

const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(cors())
app.use("/register",registerRoute)
app.use("/login",loginRoute)
app.use("/getProfile",getProfileRoute)
app.use("/calculate", calculateRoute);

app.get("/",(req,res)=>{
    res.status(200).send({message:"Hello User"})
})


app.listen(PORT,async()=>{
    await connectDB();
    console.log(`Listening to http://localhost:${PORT}`)
})