import multer from 'multer'

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uplaods/")
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    },
});
const fileFilter = (req,file,cb)=>{
    const allowedTypes=["iamge/jpeg","image/png","image/jpg"]
    if(allowedTypes.includes(file.mimtype)){
        cb(null,true)
    }
    else{
        cb(new Error("only .jpeg, .jpg , .png are allowed formats"),false)
    }
}
const upload = multer({storage,fileFilter})
export default upload