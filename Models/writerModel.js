const mongoose =require("mongoose")

const writerSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"username is required"]
    },
    Password:{
        type:String,
        required:[true,"password is required"]
    }
})

const writer = mongoose.model("writers",writerSchema)
module.exports = writer