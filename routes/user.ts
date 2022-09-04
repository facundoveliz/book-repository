import { Router } from 'express'
import auth from '../middleware/authMiddleware'
import { catchErrors } from '../middleware/errorHandlerMiddleware'
import {
  deleteUser,
  getUser,
  loginUser,
  putUser,
  registerUser,
} from '../controllers/user'

const router: Router = Router()

router.get('/', auth, catchErrors(getUser))
router.post('/register', catchErrors(registerUser))
router.post('/login', catchErrors(loginUser))
router.put('/', auth, catchErrors(putUser))
router.delete('/', auth, catchErrors(deleteUser))

export default router
