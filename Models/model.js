const mongoose= require("mongoose")
 
const mySchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"name is required"]
    },
    Email:{
        type:String,
        required:[true,"email is required"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    // isSuperAdmin:{
    //     type:Boolean,
    //     default:false
    // },
    isWriter:{
        type:Boolean,
        default:false
    },
    isEditor:{
        type:Boolean,
        default:false
    },
    isLoggedin:{
        type:Boolean,
        default:false
    },
    Password:{
        type:String,
        required:[true,"password required"]
    },
    profilePic:{
        type:String,
        required:[true,"profile pic is required"]
    },
    Token:{
        type:String,
    
    }
},{timestamps:true})

const userModel = mongoose.model("Users",mySchema)
module.exports = userModel