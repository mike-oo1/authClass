const express = require("express")
const mongoose =require("mongoose")
const adminModel= require("../Models/model")
const Model= require("../Models/model")
const jwt =require("jsonwebtoken")
const bcryptjs =require("bcryptjs")

exports.createAdmin = async(req,res)=>{
    try {
        const id = req.params.id
        const {userName,Email,Password}=(id, req.body)
        const salt =bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(Password,salt)
        const data ={
            userName,
            Email,
            Password:hash,
            profilePic:req.file.path
        }
        const createAdmin= new adminModel(data)
        const newToken = jwt.sign({
            userName,
            Password,
            userId:createAdmin._id
        },process.env.JWT_TOKEN,{expiresIn: "1d"})
        createAdmin.Token = newToken
        await createAdmin.save()
       return res.status(200).json({
            message:"created",
            data:createAdmin
        })
    } catch (error) {
        return res.status(500).json({
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
        const {id} =req.params
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