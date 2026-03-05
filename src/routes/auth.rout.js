import {Router} from 'express'
import  {validate}  from '../middlewares/validator.midddleware.js'

const router = Router()

import { registerUser } from '../controllers/auth.controller.js'
router.route("/").post(validate,registerUser)

export default router;