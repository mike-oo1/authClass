const refs = require("../Models/refModel")
const writer = require("../Models/writerModel")
const bcrypt =require("bcryptjs")
// const jwt = require("jsonwebtoken")
exports.writerLogin = async(req,res)=>{
    try {
        const {userName,Password}=req.body
        const check = await writer.findOne({userName:userName})
        if(!check){
           return res.status(400).json({
                message:"wrong username format"
            })
        }
        const isPassword = await bcrypt.compare(Password,check.Password)
        if(!isPassword){
            return res.status(400).json({
                message: "wrong password"
            })
        }else{
            return res.status(200).json({
                message:"you have successfully logged in",
            })
        }

    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
exports.isDone = async(req,res)=>{
    try {
        const {Task} = req.body
        if(Task.length <=100){
            return res.status(200).json({
                message: `youre yet to complete ur task`,
                data:Task.length,
                status : {isDone:false,isPending:true,isCompletedWords:false} 

            })
        }else if(Task.length == 200){
            return res.status(200).json({
                messgae:`task completed`,
                data:Task.length,
                status : {isDone:true,isPending:false,isCompletedWords:true}


            })
        }else if(Task.length > 200){
            return res.status(200).json({
                message:`youre limited to ${totalWords} per client`,
                data: Task.length
            })
        }
        const check = await refs.create(Task)
        check.save()
     
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }
}
exports.getAllDoneTasks = async(req,res)=>{
    try {
        const allDoneTasks = await refs.find({isDone:this.isDone})
        if(!allDoneTasks){
            return res.status(404).json({
                message:"no complete task found"
            })
        }else{
            return res.status(200).json({
                message: "here are all the completed tasks",
                status :{isDone:true},
                data:allDoneTasks
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.getAllPendingTasks = async(req,res)=>{
  try {
    const pendingTasks = await refs.find({isPending:isPending})
    if(!pendingTasks){
        return res.status(404).json({
            message:"no pending tasks  found"
        })
    }else{
        return res.status(200).json({
            message:"here are all pending tasks",
            data:pendingTasks
        })
    }
    
  } catch (error) {
    return res.status(500).json({
        message: error.message
    })
    
  }
}
