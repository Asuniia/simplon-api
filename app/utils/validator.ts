import type { Request, Response, NextFunction } from "express";
import type { VineValidator } from "@vinejs/vine";
import { SchemaTypes } from "@vinejs/vine/types";

export const validate =
    <T extends SchemaTypes>(schema: VineValidator<T, any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: T = await schema.validate(req.body);
            res.locals.validated = data;
            next();
        } catch (error: any) {
            res.status(422).json({ errors: error.messages });
        }
    };
