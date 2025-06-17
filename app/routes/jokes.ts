import JokeController from "@/controllers/joke_controller";
import { routeHandler as r } from "@/utils/handler";
import { validate } from "@/utils/validator";
import { createJokeValidator } from "@/validators/joke_validator";
import express from "express";

const router = express.Router();

/**
 * @openapi
 * /jokes:
 *   post:
 *     summary: Add a new joke
 *     tags:
 *       - Jokes
 *     requestBody:
 *       description: Joke object to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *               content:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 500
 *     responses:
 *       201:
 *         description: Joke created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       422:
 *         description: Validation error
 */
router.post("/", validate(createJokeValidator), r(JokeController, "store"));
/**
 * @openapi
 * /jokes:
 *   get:
 *     summary: Get all jokes
 *     tags:
 *       - Jokes
 *     responses:
 *       200:
 *         description: List of all jokes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Joke'
 */
router.get("/", r(JokeController, "all"));
/**
 * @openapi
 * /jokes/random:
 *   get:
 *     summary: Get a random joke
 *     tags:
 *       - Jokes
 *     responses:
 *       200:
 *         description: Random joke retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: No jokes available
 */

router.get("/random", r(JokeController, "random"));

/**
 * @openapi
 * /jokes/{id}:
 *   get:
 *     summary: Get a joke by ID
 *     tags:
 *       - Jokes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the joke to retrieve
 *     responses:
 *       200:
 *         description: Joke found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: Joke not found
 */
router.get("/:id", r(JokeController, "show"));

/**
 * @openapi
 * components:
 *   schemas:
 *     Joke:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export default router;
