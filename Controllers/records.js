const scores =require("../Models/userModel")

exports.newScore =async(req,res)=>{
    try {
        const{Maths,English}=req.body
        const data={
            Maths,
            English
        }
        const newRec =await scores.create(data)
        if(!newRec){
            return res.status(400).json({
                message:"cannot create"
            })
        }else{
            return res.status(201).json({
                message:"successfully created",
                data:newRec 
            })
        }
        
    } catch (error) {
         return res.status(500).json({
            message:error.message
        })
    }
}

exports.getAll = async(req,res)=>{
    try {
        const getAll =await scores.find()
        if(!getAll){
            return res.status(404).json({
                message:"cant find records"
            })
        }else{
            return res.status(200).json({
                message:"here are all the users",
                data:getAll

            })
        }
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}
exports.getOne = async(req,res)=>{
    try {
        const id = req.params.id
        const getOne = await scores.findById(id)
        if(!getOne){
            return res.status(404).json({
                message:`user with id ${id} is not found`
            })
        }else{
            return res.status(200).json({
                message:`here is the user with id ${id}`,
                data:getOne
            })
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}
exports.updateUser = async(req,res)=>{
    try {
        const id = req.params.id
        const updatedUser = await scores.findByIdAndUpdate(id)
        if(!updatedUser){
            return res.status(404).json({
                message:"cannot update"
            })
        }else{
            return res.status(200).json({
                message:`the user with id ${id} has been updated`,
                data:updatedUser
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}
exports.deleteUser = async(req,res)=>{
    try {
        const id = req.params.id
        const deletedUser = await scores.findByIdAndDelete(id)
        if(!deletedUser){
            return res.status(404).json({
                message:"cannot delete"
            })
        }else{
            return res.status(200).json({
                message:`the user with id ${id} has been deleted`,
                data:deletedUser
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}