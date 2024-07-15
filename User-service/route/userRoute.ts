import express,{ Router} from 'express'
import {user} from '../controller/userController'

const router: Router= express.Router();
router.post('/',user)
export default router;