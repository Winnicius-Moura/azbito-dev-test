import { EstablishmentController } from '@/infra/controller/establishmentController'
import { Router } from 'express'

const router = Router()

router.get('/:id', EstablishmentController.findById)
router.put('/:id', EstablishmentController.update)
router.post('/', EstablishmentController.create)
router.get('/', EstablishmentController.findAll)
router.delete('/:id', EstablishmentController.delete)

export default router