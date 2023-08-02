const mongoose =require("mongoose")
const express= require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.configDotenv({path:"./Config/config.env"})
const route =require("./Router/route")
const routes = require("./Router/refRoute")
const app = require("./app")
app.use(cors({
    origin: '*',
    methods: ["GET"]
}))
app.use("/api",route)

app.use("/Uploads", express.static(__dirname + "/Uploads"))

app.use("/api",route)
app.use("/api",routes)
const DB = process.env.DATABASE

mongoose 
.connect(DB)
.then(()=>{
    console.log("database connected")
}).catch((error)=>{
    console.log(error)
})