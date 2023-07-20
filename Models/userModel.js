const mongoose =require("mongoose")

const reordschema = new mongoose.Schema({
    Maths:{
        type:Number,
        required:[true,"math score is required"]
    },
    English:{
        type:Number,
        required:[true,"English score is required"]
    }
})
const Scores = mongoose.model("records",reordschema)
module.exports = Scores


