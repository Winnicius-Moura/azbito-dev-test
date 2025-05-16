import { EstablishmentController } from '@/infra/controller/establishmentController'
import { Router } from 'express'

const router = Router()

router.get('/', EstablishmentController.findAll)
router.get('/:id', EstablishmentController.findById)
router.post('/', EstablishmentController.create)
router.put('/:id', EstablishmentController.update)
router.delete('/:id', EstablishmentController.delete)

export default router