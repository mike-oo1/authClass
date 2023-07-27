const express =require("express")
const multer = require("../Utils/multer")
const {newUser,signIn,userVerify,changePassword,logout}=require("../Controllers/controller")
const{newScore,getAll,getOne,updateUser,deleteUser}=require("../Controllers/records")
const{newUsers,getAlls}=require("../Controllers/adminController")
const { userAuth,isAdminAuthorized  } = require("../Middleware/authorization")
const{upgradeAdminTosuperAdmin} =require("../Controllers/adminController")



const Router =express.Router()
Router.route("/logout").get(logout)
Router.route("/signup").post(multer,newUser)
Router.route("/userverify/:id/:token").put(userVerify)
Router.route("/signin").post(signIn)
Router.route("/changepass/:id").put(changePassword)
Router.route("/record").post(newScore)
Router.route("/admin/:id").post(newUsers)
Router.route("/getAll").get(getAll)
Router.route("/getAlls").get(getAlls)
Router.route("/getOne").get(getOne)
Router.route("/update/:id").put(updateUser)
Router.route("/updates/:id").put(userAuth,isAdminAuthorized,upgradeAdminTosuperAdmin)
Router.route("/delete/:id").delete(userAuth,isAdminAuthorized ,deleteUser)

module.exports=Router