import { UserController } from '@/infra/controller/userController'
import { Router } from 'express'

const router = Router()

router.get('/:id', UserController.findById)
router.put('/:id', UserController.update)
router.post('/', UserController.create)
router.get('/', UserController.findAll)

export default router