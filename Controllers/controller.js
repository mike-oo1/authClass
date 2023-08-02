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
exports.userVerify = async(req,res)=>{
    try {
        const registeredUser = await userModel.findById(req.params.id)
        const registeredToken= registeredUser.Token
        await jwt.verify(registeredToken,process.env.JWT_TOKEN,(err,data)=>{
            if(err){
                return res.status(300).json({
                    message:"this link has expired"
                })
            }else{
                return data
            }
        })
        const verified =await userModel.findByIdAndUpdate(req.params.id,{isVerified:true},)
        if(!verified){
            return res.status(400).json({
                message:"unable to verify user"
            })
        }else{
            return res.status(200).json({
                message:"user has been verified"
            })
        }
        
    } catch (error) {
       return 
       
        
    }
}
exports.signIn = async(req,res)=>{
    try {
        const {userName,Password}=req.body
        const check = await userModel.findOne({userName:userName})
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
exports.changePassword=async(req,res)=>{
    try {
        const {Password}=req.body
       const id =req.params.id
       const salt =bcryptjs.genSaltSync(10)
       const hash = bcryptjs.hashSync(Password,salt)
       const resetDetails={
        Password:hash
    }
        const result =await userModel.findByIdAndUpdate(id,resetDetails,{Password:hash},{new:true})

        if(!result){
            res.status(400).json({
                message:"cannot reset password"
            })
        }else{
            res.status(200).json({
                status:"success",
                message:"password reset successfully",
                data:result
            })
        }   
        const createToken =jwt.sign({
            Password
        },process.env.JWT_TOKEN,{expiresIn :"1d"})
        check.Token =createToken
        const SAVE = await check.save()
        res.status(201).json({
            status:"successful",
            message:"password changed  successfully",
            data:SAVE
        })
    } catch (error) {
    (error.message)
      
        
    }
}

exports.logout =async(req,res)=>{
    try {
        const user =await todoModel.findById(req.users._id)
        const bin =[]
        const hasAuth = req.headers.authorization
        const token = hasAuth.spit(" ")[1]
        bin.push(token)
        user.isLoggedin =false
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