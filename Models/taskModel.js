const mongoose=require("mongoose")
const refModel= new mongoose.Schema({
    Task:{
        type:String,
        required:[true,"task is required"]
    },
    isDone:{
        type:Boolean
    },
    isCompleteWords:{
        type:Boolean
    },
    isPending:{
        type:Boolean
    }

})

const ref = mongoose.model("reference",refModel)
module.exports = ref