const express =require("express")
const {isDone, writerLogin}= require("../Controllers/writerCrud")

const Router = express.Router()

Router.route("/done").get(isDone)
Router.route("/write").post(isDone)
Router.route("/login").post(writerLogin)

module.exports=Router