import { Router } from 'express'
import auth from '../middleware/authMiddleware'
import {
  getBooks, postBook, putBook, deleteBook,
} from '../controllers/book'
import { catchErrors } from '../middleware/errorHandlerMiddleware'

const router: Router = Router()

router.get('/', auth, catchErrors(getBooks))
router.post('/', auth, catchErrors(postBook))
router.put('/:id', auth, catchErrors(putBook))
router.delete('/:id', auth, catchErrors(deleteBook))

export default router
