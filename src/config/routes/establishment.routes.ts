import { EstablishmentController } from '@/infra/controller/establishmentController';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Establishments
 *   description: Gerenciamento de estabelecimentos
 */

/**
 * @swagger
 * /establishments:
 *   get:
 *     summary: Lista todos os estabelecimentos
 *     tags: [Establishments]
 *     responses:
 *       200:
 *         description: Lista de estabelecimentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Establishment'
 */
router.get('/', EstablishmentController.findAll);

/**
 * @swagger
 * /establishments/{id}:
 *   get:
 *     summary: Obtém um estabelecimento por ID
 *     tags: [Establishments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do estabelecimento
 *     responses:
 *       200:
 *         description: Estabelecimento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Establishment'
 *       404:
 *         description: Estabelecimento não encontrado
 */
router.get('/:id', EstablishmentController.findById);

/**
 * @swagger
 * /establishments:
 *   post:
 *     summary: Cria um novo estabelecimento
 *     tags: [Establishments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Establishment'
 *     responses:
 *       201:
 *         description: Estabelecimento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Establishment'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', EstablishmentController.create);

/**
 * @swagger
 * /establishments/{id}:
 *   put:
 *     summary: Atualiza um estabelecimento
 *     tags: [Establishments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do estabelecimento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Establishment'
 *     responses:
 *       200:
 *         description: Estabelecimento atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Establishment'
 *       404:
 *         description: Estabelecimento não encontrado
 */
router.put('/:id', EstablishmentController.update);

/**
 * @swagger
 * /establishments/{id}:
 *   delete:
 *     summary: Remove um estabelecimento
 *     tags: [Establishments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do estabelecimento
 *     responses:
 *       204:
 *         description: Estabelecimento removido com sucesso
 *       404:
 *         description: Estabelecimento não encontrado
 */
router.delete('/:id', EstablishmentController.delete);

export default router;