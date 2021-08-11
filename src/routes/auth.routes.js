import { Router } from "express";
const router = Router()

import * as authCtrl from '../controllers/auth.controller'
import {verifySignup} from '../middlewares'

router.post('/signin', [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRoleExists], authCtrl.signIn)

router.post('/signup', authCtrl.signUp)

export default router