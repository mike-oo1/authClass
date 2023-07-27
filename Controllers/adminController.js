const express = require("express")
const mongoose =require("mongoose")
const adminModel= require("../Models/model")
const Model= require("../Models/model")
const jwt =require("jsonwebtoken")
const bcryptjs =require("bcryptjs")

exports.newUsers = async(req,res)=>{
    try {
        const {userName,Email,Password}= req.body
        // hashing password
        const salt =bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(Password,salt)
        console.log(req.file)
        const data ={
            userName,
            Email,
            Password:hash,
            profilePic:req.file.path
        }
        const createUser =await new userModel(data)
        // generate the token
        const newToken = jwt.sign({
            userName,
            Password
        },process.env.JWT_TOKEN,{expiresIn: "1d"})
        createUser.Token = newToken
        const subject ="KINDLY VERIFY BRO"
        const link =`${req.protocol}: //${req.get("host")}/userverify${createUser._id}/${newToken}`
        const message =`click on this link${link} to verify, kindly note that this link will expire after 5 minutes`
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
exports.signIn = async(req,res)=>{
    try {
        const {userName,Password}=req.body
        const check = await adminModel.findOne({userName:userName})
        if(!check){
           return res.status(400).json({
                message:"wrong username format"
            })
        }
        const isPassword = await bcryptjs.compare(Password,check.Password)
        if(!isPassword){
            return res.status(400).json({
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
return res.status(201).json({
    status:"successful",
    message:"logged in successful",
    data:check
})

    } catch (error) {
       error.message
        
    }
}
exports.upgradeAdminTosuperAdmin =async(req,res)=>{
    try {
        const {id} =req.params.id
        console.log(id);
        const newsuperAdmin =await adminModel.findByIdAndUpdate(id,
            {isSuperAdmin:true,
            isAdmin:true,
        },{
            new:true
        })
        return res.status(200).json({
            message:"success",
            data:newsuperAdmin
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })       
   }
}
exports.getAlls =async(req,res)=>{
    try {
        const getAllUsers =await adminModel.find()
        if(getAllUsers){
            return res.status(200).json({
                messafe:"here are all iusers",
                data:getAllUsers
            })
        }else{
            return res.status(200).json({
                message:"cannot",
                
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
        
    }
}
exports.logout =async(req,res)=>{
    try {
        const user =await adminModel.findById(req.users._id)
        const bin =[]
        const hasAuth = req.headers.authorization
        const token =hasAuth.split(" ")[1]
        bin.push(token)
        await user.save()
        return res.status(201).json({
            message:"this user has been logged out successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
    }

}
