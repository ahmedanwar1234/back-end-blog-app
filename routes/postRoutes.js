import express from 'express'
import multer from 'multer'
import {createPost, deletePost, getPosts,getPost, updatePost, getAllPosts}from '../controllers/postControllers.js'
import { adminGuard, authGaurd } from '../middleware/authMiddleware.js'

const router=express.Router()

router.get('/',getAllPosts)
router.post('/',authGaurd,adminGuard,createPost)
router.put('/:slug',authGaurd,adminGuard,updatePost)
router.delete('/:slug',authGaurd,adminGuard,deletePost)
router.get('/:slug',getPost)

export default router;