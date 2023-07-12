const express =require("express")
const {newUser,signIn,userVerify}=require("../Controllers/controller")
const Router =express.Router()

Router.route("/signup").post(newUser)
Router.route("/userverify/:id").put(userVerify)
Router.route("/signin").post(signIn)
module.exports=Router