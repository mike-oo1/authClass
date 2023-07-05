const express =require("express")
const {newUser,signIn}=require("../Controllers/controller")
const Router =express.Router()

Router.route("/signup").post(newUser)
Router.route("/signin").post(signIn)
module.exports=Router