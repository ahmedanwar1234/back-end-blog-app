import express from 'express'
import multer from 'multer'
import { createComment,deleteComment,updateComment }from '../controllers/commetControllers.js'
import { adminGuard, authGaurd } from '../middleware/authMiddleware.js'

const router=express.Router()

router.post('/',authGaurd,createComment)
router.put('/:commentId',authGaurd,updateComment)
router.delete('/:commentId',authGaurd,deleteComment)


export default router;