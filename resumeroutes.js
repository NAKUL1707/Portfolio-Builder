import express from 'express'

import {protect} from '../middleware/authmiddleware.js'
import { createResume , deleteResume, getResumebyID, getUserResume, updateResume} from '../controller/resumecontroller.js'
import { formToJSON } from 'axios'
import { uploadResumeImage } from '../controller/uploadimages.js'

const resumeRouter = express.Router()
resumeRouter.post('/',protect,createResume)
resumeRouter.get('/',protect,getUserResume)
resumeRouter.post('/:id',protect,getResumebyID)

resumeRouter.put('/:id',protect,updateResume)
resumeRouter.put('/:id/uplaod-image',protect,uploadResumeImage)
resumeRouter.delete('/:id',protect,deleteResume)

export default resumeRouter
