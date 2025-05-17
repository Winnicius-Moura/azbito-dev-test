import { EstablishmentRulesController } from '@/infra/controller/establishmentRulesController';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: EstablishmentRules
 *   description: Regras de envio de mídia para estabelecimentos
 */

/**
 * @swagger
 * /establishments/rules:
 *   post:
 *     summary: Cria regras para um estabelecimento
 *     tags: [EstablishmentRules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - establishmentId
 *               - picturesLimit
 *               - videoLimit
 *             properties:
 *               establishmentId:
 *                 type: string
 *                 example: est123
 *               picturesLimit:
 *                 type: number
 *                 example: 5
 *               videoLimit:
 *                 type: number
 *                 example: 2
 *     responses:
 *       201:
 *         description: Regras criadas com sucesso
 */
router.post('/', EstablishmentRulesController.create);

/**
 * @swagger
 * /establishments/rules/{id}:
 *   get:
 *     summary: Busca regras de um estabelecimento por ID
 *     tags: [EstablishmentRules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do estabelecimento
 *     responses:
 *       200:
 *         description: Regras encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 establishmentId:
 *                   type: string
 *                 picturesLimit:
 *                   type: number
 *                 videoLimit:
 *                   type: number
 */
router.get('/:id', EstablishmentRulesController.findByEstablishmentId);

/**
 * @swagger
 * /establishments/rules/{id}:
 *   put:
 *     summary: Atualiza as regras de um estabelecimento
 *     tags: [EstablishmentRules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da regra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               picturesLimit:
 *                 type: number
 *                 example: 6
 *               videoLimit:
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: Regra atualizada com sucesso
 */
router.put('/:id', EstablishmentRulesController.update);

/**
 * @swagger
 * /establishments/rules/{id}:
 *   delete:
 *     summary: Remove uma regra de estabelecimento
 *     tags: [EstablishmentRules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da regra
 *     responses:
 *       204:
 *         description: Regra removida com sucesso
 */
router.delete('/:id', EstablishmentRulesController.delete);

export default router;
