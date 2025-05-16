import { ProductController } from '@/infra/controller/productController'
import { Router } from 'express'

const router = Router()

router.get('/:id', ProductController.findById)
router.post('/', ProductController.create)
router.put('/:id', ProductController.update)
router.get('/', ProductController.findAll)
router.delete('/:id', ProductController.delete)

export default router