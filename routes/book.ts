import { Router } from 'express'
import { catchErrors } from '../middleware/errorHandlerMiddleware'
import { getBook } from '../controllers/book'

const router: Router = Router()

router.get('/', catchErrors(getBook))

export default router
