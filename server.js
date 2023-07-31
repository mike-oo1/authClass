const mongoose =require("mongoose")
const dotenv = require("dotenv")
dotenv.configDotenv({path:"./Config/config.env"})
const route =require("./Router/route")
const routes = require("./Router/refRoute")
app.use("cors")
const app = require("./app")
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