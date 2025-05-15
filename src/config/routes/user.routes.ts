import { UserController } from '@/infra/controller/userController'
import { Router } from 'express'

const router = Router()

router.get('/:id', UserController.findById)
router.put('/:id', UserController.update)
router.post('/', UserController.create)
router.get('/', UserController.findAll)
router.delete('/:id', UserController.delete)

export default router