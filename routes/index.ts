import { Router } from 'express'

import user from './user'
import book from './book'

const router: Router = Router()

router.use('/api/users', user)
router.use('/api/books', book)

export default router
