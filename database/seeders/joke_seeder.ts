import { QueryInterface } from "sequelize";

const jokesData = [
    {
        title: "Quelle est la capitale de la folie ?",
        content: "La Mongolie",
    },
    {
        title: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?",
        content: "Parce que sinon ils tombent dans le bateau.",
    },
    {
        title: "Qu'est-ce qui est jaune et qui attend ?",
        content: "Jonathan.",
    },
    {
        title: "Pourquoi les squelettes ne se battent jamais entre eux ?",
        content: "Ils n’ont pas le cran.",
    },
    {
        title: "Quel est le comble pour un électricien ?",
        content: "De ne pas être au courant.",
    },
    {
        title: "Pourquoi les chats n’aiment pas l’ordinateur ?",
        content: "Parce qu’ils préfèrent la souris.",
    },
    {
        title: "Quel est le comble pour un jardinier ?",
        content: "De raconter des salades.",
    },
    {
        title: "Pourquoi les canards ont-ils autant de plumes ?",
        content: "Pour couvrir leur derrière.",
    },
    {
        title: "Que fait un canard quand il tombe ?",
        content: "Il fait coin-coin.",
    },
    {
        title: "Pourquoi les poules ne portent-elles pas de chaussures ?",
        content: "Parce qu’elles ont des pattes.",
    },
];

export default async function run(queryInterface: QueryInterface) {
    const jokes = jokesData.map((joke) => ({
        ...joke,
        createdAt: new Date(),
        updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("jokes", jokes, {});
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("jokes", {}, {});
}
