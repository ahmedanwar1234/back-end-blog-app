import { uploadPicture } from "../middleware/uploadPictureMiddleware.js";
import fileRemover from "../utils/fileRemover.js";
import Post from "../models/Post.js";
import { v4 as uuidv4 } from 'uuid'
import Comment from "../models/Comment.js";
import { json } from "express";


const getPosts = async (req, res, next) => {
    const post = await Post.find();
    res.status(200).json({
        post
    })
}

const createPost = async (req, res, next) => {
    console.log('test')
    try {
        const post = new Post({
            title: 'Smple title',
            caption: 'sample Caption',
            slug: uuidv4(),
            body: {
                type: 'doc',
                conent: []
            },
            photo: " ",
            user: req.user._id,

        })

        const createdPost = await post.save()
        return res.json({ createdPost })
    } catch (error) {
        next(error)
    }
}





const updatePost = async (req, res, next) => {;
    try {
        const post = await Post.findOne({ slug: req.params.slug });
    
        if (!post) {
          const error = new Error("Post aws not found");
          next(error);
          return;
        }
    
        const upload = uploadPicture.single("postPicture");
    
        const handleUpdatePostData = async (data) => {
          const { title, caption, slug, body, tags, categories } = JSON.parse(data);

          post.title = title || post.title;
          post.caption = caption || post.caption;
          post.slug = slug || post.slug;
          post.body = body || post.body;
          post.tags = tags || post.tags;
          post.categories = categories || post.categories;
          const updatedPost = await post.save();
          return res.json(updatedPost);
        };
    ;
        upload(req, res, async function (err) {
          ;
          if (err) {
            const error = new Error(
              "An unknown error occured when uploading " + err.message
            );
            next(error);
          } else {
            // every thing went well
            if (req.file) {
                console.log(req.file)
              let filename;
              filename = post.photo;
              if (filename) {
                fileRemover(filename);
              }
              post.photo = req.file.filename;
              handleUpdatePostData(req.body.document);
            } else {
              let filename;
              filename = post.photo;
              post.photo = "";
              fileRemover(filename);
              handleUpdatePostData(req.body.document);
            }
          }
        });
      } catch (error) {
        next(error);
      }
}


const deletePost=async(req,res,next)=>{
try {
    const post=await Post.findOneAndDelete({slug:req.params.slug})
    
    if(!post){
        const error=new Error('post aws not found');
        return next(error)
    }

   await Comment.deleteMany({post:post._id});
    return res.json({
        message:'post is successfull deleted',
        post
    })
} catch (error) {
    next(error)
}
}


const getPost=async(req,res,next)=>{
    try {
        const post =await Post.findOne({slug:req.params.slug}).populate([{
            path:'user',
            select:['avatar','name'],
        },
    {
        path:'comments',
        match:{
            check:true,
            parent:null
        },populate:[{
            path:'user',
            select:['avatar','name']
        },
    {
        path:'replies',
        match:{
            check:true
        },
        populate:[{
            path:'user',
            select:['avatar','name']
        }]
    }]
    }])

        if(!post){
            const error=new Error('post was not found');
            return next(error);

        }
        return res.json(post)
    } catch (error) {
        next(error)
    }
}


const getAllPosts=async(req,res,next)=>{
    try {
        const filter=req.query.searchKeyword;
        let where ={}
        if(filter){
            where.title={$regex :filter,$options:'i'};
        }
let query=Post.find(where)

const page=parseInt(req.query.page) || 1;
let pageSize=parseInt(req.query.limit)||10;
if(!where){
    pageSize=300
}
const skip=(page-1)*pageSize;
const total=await Post.countDocuments();
const pages=Math.ceil(total/pageSize)

     res.header({
    'x-filter':filter,
    'x-totalcount':JSON.stringify(total),
    'x-currentpage':JSON.stringify(page),
    'x-pagesize':JSON.stringify(pageSize),
    'x-totalpagecount':JSON.stringify(page)
})  
if(page>pages){
return res.json([])
}
const result =await query.skip(skip).limit(pageSize).populate([{path:'user',select:['avatar','name','verified']}]).sort({updatedAt:'desc'});



console.log(result)
return res.json(result)
    } catch (error) {
        next(error)
    }
}
const getAllPostslanding=async(req,res,next)=>{
    try {
        const filter=req.query.searchKeyword;
        let where ={}
        if(filter){
            where.title={$regex :filter,$options:'i'};
        }
let query=Post.find(where)

const page=parseInt(req.query.page) || 1;
let pageSize=parseInt(req.query.limit)||10;
if(!where){
    pageSize=300
}
const skip=(page-1)*pageSize;
const total=await Post.countDocuments();
const pages=Math.ceil(total/pageSize)
       
if(page>pages){
const error=new Error('No page found');
return next(error)
}

const result =await query.skip(skip).limit(pageSize).populate([{path:'user',select:['avatar','name','verified']}]).sort({updatedAt:'desc'});

res.header({
    'x-filter':filter,
    'x-totalcount':JSON.stringify(total),
    'x-currentpage':JSON.stringify(page),
    'x-pagesize':JSON.stringify(pageSize),
    'x-totalpagecount':JSON.stringify(page)
})


return res.json(result)
    } catch (error) {
        next(error)
    }
}


export { createPost, updatePost,deletePost,getPosts ,getPost,getAllPosts}



/**
 * 
 * {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Wow, this editor instance exports its content as JSON"
          }
        ]
      },
      {
        type: "paragraph",
        conten: [
          {
            type: "text",
            marks: [
              {
                type: "bold"
              },
              {
                type: "italic"
              }
            ],
            text: "this is a bold text"
          }
        ]
      }
    ]
  }
 */