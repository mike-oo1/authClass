const mongoose= require("mongoose")
const userModel = require("../Models/model")
const jwt =require("jsonwebtoken")
const bcryptjs =require("bcryptjs")
const mailsender =require("./email")
const dotenv=require("dotenv")
dotenv.config()

exports.msg =async(req,res)=>{
    const message =await userModel.create(req.body)
    res.status(200).json({
         message:"welcome bro",
         data:message
    })
}

exports.newUser = async(req,res)=>{
    try {
        const {userName,Email,Password}= req.body
        // hashing password
        const salt =bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(Password,salt)

        const data ={
            userName,
            Email,
            Password:hash
        }
       

        const createUser =await new userModel(data)
        // generate the token

        const newToken = jwt.sign({
            userName,
            Password
        },process.env.JWT_TOKEN,{expiresIn: "1d"})
        createUser.Token = newToken
        const subject ="KINDLY VERIFY BRO"
        const link =`${req.protocol}: //${req.get("host")}/userverify/${createUser._id}`
        const message =`CLICK ON THR ${link} TO VERIFY`
        mailsender(
            {
                from:"gmail",
                email:createUser.Email,
                subject:`kindly verify`,
                message:link
            }
        )
        await createUser.save()
        res.status(200).json({
            message:"created",
            data:createUser
        })

        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }

}
exports.userVerify = async(req,res)=>{
    try {
        const verified =await userModel.findByIdAndUpdate(req.params.id,{isVerified:true},)
        if(!verified){
            return res.status(400).jspn({
                message:"unable to verify user"
            })
        }else{
            return res.status(200).json({
                message:"user has been verified"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
    }
}
exports.signIn = async(req,res)=>{
    try {
        const {userName,Password}=req.body
        const check = await userModel.findOne({userName:userName})
        if(!check){
            res.status(400).json({
                message:"wrong password format"



            })
        }
        const isPassword = await bcryptjs.compare(Password,check.Password)
        if(!isPassword){
            res.status(400).json({
                message: "wrong password"
            })
        }

        // GENERATING LOGIN TOKEN
const createToken =jwt.sign({
    userName,
    Password
},process.env.JWT_TOKEN,{expiresIn :"1d"})
check.token =createToken
await check.save()
res.status(201).json({
    status:"successful",
    message:"logged in successful",
    data:check
})

    } catch (error) {
       error
        
    }
}

exports.forgotPassWord =async(req,res)=>{
    
}