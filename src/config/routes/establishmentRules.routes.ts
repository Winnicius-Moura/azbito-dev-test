import { EstablishmentRulesController } from '@/infra/controller/establishmentRulesController';
import { Router } from 'express';

const router = Router();

router.post('/', EstablishmentRulesController.create)
router.get('/:id', EstablishmentRulesController.findByEstablishmentId)
router.put('/:id', EstablishmentRulesController.update)
router.delete('/:id', EstablishmentRulesController.delete)


export default router;