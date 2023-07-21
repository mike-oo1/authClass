const express =require("express")
const {newUser,signIn,userVerify,changePassword}=require("../Controllers/controller")
const{newScore,getAll,getOne,updateUser,deleteUser}=require("../Controllers/records")
const{createAdmin}=require("../Controllers/adminController")
const { userAuth,isAdminAuthorized  } = require("../Middleware/authorization")

const Router =express.Router()

Router.route("/signup").post(newUser)
Router.route("/userverify/:id/:token").put(userVerify)
Router.route("/signin").post(signIn)
Router.route("/changepass/:id").put(changePassword)
Router.route("/record").post(newScore)
Router.route("/admin").post(isAdminAuthorized,createAdmin)
Router.route("/getAll/:id").get(userAuth,isAdminAuthorized,getAll)
Router.route("/getOne").get(getOne)
Router.route("/update/:id").put(isAdminAuthorized ,updateUser)
Router.route("/delete/:id").delete(isAdminAuthorized ,deleteUser)


module.exports=Router