import { EstablishmentController } from '@/infra/controller/establishmentController'
import { Router } from 'express'

const router = Router()

router.get('/', EstablishmentController.findByType)
router.get('/:id', EstablishmentController.findById)
router.post('/', EstablishmentController.create)
router.put('/:id', EstablishmentController.update)
router.get('/', EstablishmentController.findAll)
router.delete('/:id', EstablishmentController.delete)

export default router