import { UserController } from '@/infra/controller/userController';
import { Router } from 'express';

const router = Router();

router.get('/:id', UserController.findById);
router.post('/', UserController.create);

export default router;