import { Schema,model } from "mongoose";
import { hash,compare } from "bcrypt";
import JWT from "jsonwebtoken";
const UserSchema=new Schema({
avatar:{
    type:String,
    default:''
},
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
verified:{type:Boolean,default:false},
verificationCode:{
    type:String,
    required:false
},
admin:{
    type:Boolean,
    default:false}


},{
    timestamps:true
});


UserSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await hash(this.password,10)
        return next()
    }

    return next()

})

UserSchema.methods.generateJWT=async function(){
return await JWT.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:'30d'})
}
UserSchema.methods.test=async function(){
return 1
}

UserSchema.pre('save',async function(next){

    this.name=this.name+`${await this.test()}`
    return next()

})

UserSchema.methods.comparePassword=async function(enterdPassword){
 return  await compare(enterdPassword,this.password)
}


const User=model('Useer',UserSchema)
export default User