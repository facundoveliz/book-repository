import { Router } from 'express'
import { catchErrors } from '../middleware/errorHandlerMiddleware'
import { getUsers } from '../controllers/user'

const router: Router = Router()

router.get('/', catchErrors(getUsers))

export default router
