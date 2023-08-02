const express =require("express")
const multer = require("../Utils/multer")
const {newUser,signIn,userVerify,changePassword,logout}=require("../Controllers/controller")
const{newUsers,getAlls}=require("../Controllers/editor")
const { userAuth,isAdminAuthorized} = require("../Middleware/authorization")
const{upgradeAdminTosuperAdmin} =require("../Controllers/editor")



const Router =express.Router()
Router.route("/logout").get(logout)
Router.route("/signup").post(multer,newUser)
Router.route("/userverify/:id/:token").put(userVerify)
Router.route("/signin").post(signIn)
Router.route("/changepass/:id").put(changePassword)
Router.route("/admin/:id").post(newUsers)
Router.route("/getAlls").get(getAlls)
Router.route("/updates/:id").put(userAuth,upgradeAdminTosuperAdmin)


module.exports=Router