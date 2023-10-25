import multer from "multer";
import path,{dirname} from 'path'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage=multer.diskStorage({
destination:(req,file,cb)=>{
    cb(null,path.join(__dirname,"../uploads")) 
},
filename:(req,file,cb)=>{
   cb(null,`${Date.now()}-${file.originalname}`) 
}
})
const uploadPicture=multer({
    storage:storage,
    limits:{
        fileSize:4*1000000 //1MB
    },fileFilter:function(req,file,cb){
let ext=path.extname(file.originalname)
if(ext !== '.png' && ext !=='.jpg' && ext !=='.jpeg'&& ext !=='.webp' ){
    return cb(new Error('Only images are allowed'))

}
cb(null,true) // accepted file true
    }
})

export {uploadPicture}