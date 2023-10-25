import express from 'express'
import multer from 'multer'
import {registerUser,loginUser,userProfile, updateProfile, getUsers, updateProfilePicture, deleteById}from '../controllers/userControllers.js'
import { authGaurd } from '../middleware/authMiddleware.js'

const router=express.Router()

router.get('/',getUsers)
router.delete('/:id',deleteById)
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/profile',authGaurd,userProfile)
router.put('/updateprofile',authGaurd,updateProfile)
router.put('/updateProfilePicture',authGaurd,updateProfilePicture)


export default router