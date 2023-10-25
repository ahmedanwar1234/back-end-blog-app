import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const authGaurd= async (req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
          
            const token=req.headers.authorization.split(" ")[1];
            const {id}=jwt.verify(`${token}`,process.env.JWT_SECRET
            )

            console.log(id)
            req.user=await User.findById(id).select('-password')
            next()
        } catch (error) {
            const err=new Error('Not authrized, Token failed')
            err.statusCode=401;
            
            next(err)
        }
    }else{
        let error=new Error('Not authrized, No Token')
        error.statusCode=401;
        next(error)

    }
}


export const adminGuard=(req,res,next)=>{
if(req.user && req.user.admin){
    next()
}else{
    let error =new Error('Not authorized as an admin');
    error.statusCode=401;
    next(error)
}
}