import vine from "@vinejs/vine";
import { Infer } from "@vinejs/vine/types";

export const createJokeValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(3).maxLength(100),
        content: vine.string().minLength(3).maxLength(500),
    })
);

export type CreateJoke = Infer<typeof createJokeValidator>;
