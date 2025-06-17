import Joke from "@/models/joke";
import { CreateJoke } from "@/validators/joke_validator";

export default class JokeService {
    public static async create(data: CreateJoke) {
        return Joke.create(data);
    }

    public static async getAll() {
        return Joke.findAll();
    }

    public static async getById(id: number) {
        return Joke.findByPk(id);
    }

    public static async getRandom() {
        return Joke.findOne({ order: [Joke.sequelize!.random()] });
    }
}
