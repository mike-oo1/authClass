const jwt = require("jsonwebtoken")
const user = require("../models/userModel")
const dotenv = require("dotenv")
dotenv.config()

// auth middleware
const userAuth = async(req,res,next)=>{
    const hasAuthorization = req.headers.authorization
    if(!hasAuthorization){
        res.status(404).json({
            message: "No authorization token provided"
        })
    } 
        const token = hasAuthorization.split(" ")[1]
        try {
            const decodedToken =  await jwt.verify( token, process.env.JWT_SECRETE )
            req.user = JSON.stringify(decodedToken);
            req.userId = decodedToken.userId;
            req.userEmail = decodedToken.email;
            req.username = decodedToken.username;
            next();
        } catch (error) {
            res.status(500).json({ message: error.message})
        }
}


// Admin middleware
const authenticator = async(req,res,next)=>{
    const newUser = await user.findById(req.params.id)
    const token = newUser.token
    jwt.verify(
        token, 
        process.env.MY_SECRET,
        (err,payLoad)=>{if(err)res.status(400).json({message:err.message})
    else {
        req.user = payLoad
        next()
    }}
        )
}
const isAdminAuthorized = (req,res,next)=>{
    authenticator(req,res,(async()=>{
        const existingUser = await user.findById(req.params.id)
        if(existingUser.isAdmin==false){res.json("You are not an admin")}
        else{
            next()
        }
    }))
} 


const isSuperAdminAuthorized = (req,res,next)=>{
    authenticator(req,res,(async()=>{
        const existingUser = await user.findById(req.params.id)
        if(existingUser.isSuperAdmin==false){res.json("You are not a Super admin")}
        else{
            next()
        }
    }))
} 
module.exports = {userAuth,isAdminAuthorized,isSuperAdminAuthorized}