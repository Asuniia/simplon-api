import Joke from "@/models/joke";
import JokeService from "@/services/joke_service";
import { CreateJoke } from "@/validators/joke_validator";
import { Request, Response } from "express";

export default class JokeController {
    public async all(_: Request, res: Response): Promise<void> {
        const jokes = await JokeService.getAll();

        res.status(200).send(jokes);
    }

    public async store(_: Request, res: Response): Promise<void> {
        const data = res.locals.validated as CreateJoke;

        const joke = await JokeService.create(data);

        res.status(201).send(joke);
    }

    public async show(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).send({ error: "Invalid ID format" });
            return;
        }

        const joke = await JokeService.getById(id);

        if (!joke) {
            res.status(404).send({ error: "No joke" });
            return;
        }

        res.status(200).send(joke);
    }

    public async random(_: Request, res: Response): Promise<void> {
        const count = await Joke.count();
        if (count === 0) {
            res.status(404).send({ error: "No jokes available" });
            return;
        }

        const joke = await JokeService.getRandom();

        res.status(200).send(joke);
    }
}
