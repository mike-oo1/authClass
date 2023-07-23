const multer =require("multer")
const path = require("path")
const myMulter = multer.diskStorage(
    {
        destination:(req,file,cb)=>{
            cb(null,"Uploads")
        },
        filename:(req,file,cb)=>{
            cb(null,file.originalname)
        }
    }
)


const fileType =(req,file,cb)=>{
    const extName =path.extname(file.originalname)
    if(extName == ".png" || extName == ".jpg" || extName == "jpeg" || extName == ".svg"){
        cb(null,true)
    }else{
        cb(new Error("wrong format"),false)
    }
}

const mike=multer({storage:myMulter,limits:{fileSize:10000000},fileFilter:fileType}).single("profilePic")

module.exports=mike