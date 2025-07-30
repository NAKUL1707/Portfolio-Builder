import express from 'express'
import { loginUser, registerUser,getuserprofile} from '../controller/usercontroller.js'
import { protect } from '../middleware/authmiddleware.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get("/profile",protect,getuserprofile)

export default userRouter