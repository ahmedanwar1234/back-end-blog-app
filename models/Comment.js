import { Schema,model } from "mongoose";

const CommentSchema=new Schema({
user:{
    type:Schema.Types.ObjectId,
    ref:'Useer',
    required:true
    
},
desc:{
    type:String,
    required:true,
    
},
post:{
    type:Schema.Types.ObjectId,
    ref:'Post',
required:true
},
check:{
    type:Boolean,
    default:false,
 
},   parent:{
        type:Schema.Types.ObjectId,
        ref:'Comment',
        default:null
},
replyOnUser:{
    type:Schema.Types.ObjectId,
    ref:'Useer',
    default:null
}
},{
    timestamps:true,toJSON:{virtuals:true}
}

);


CommentSchema.virtual('replies',{
    ref:'Comment',
    localField:'_id',
    foreignField:'parent'
})



const Comment=model('Comment',CommentSchema)
export default Comment