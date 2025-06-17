import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const router = express.Router();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "JokeAPI",
            version: "1.0.0",
        },
    },
    apis: ["./app/routes/*.ts", "./app/routes/*.js"],
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "JokeAPI Documentation",
            version: "1.0.0",
            description: "API documentation for the JokeAPI",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
            },
        ],
    },
};

const swaggerSpec = swaggerJsdoc(options);

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
