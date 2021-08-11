import { Router } from "express";
const router = Router()
import * as userCtrl from '../controllers/user.controller'
import {authJwt, verifySignup} from '../middlewares'

// Get all users
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isModerator, verifySignup.checkRoleExists],userCtrl.createUser)

export default router