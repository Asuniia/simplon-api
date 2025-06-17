import db from "@/libs/database";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export default class Joke extends Model<InferAttributes<Joke>, InferCreationAttributes<Joke>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare content: string;
}
Joke.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: "Joke",
        tableName: "jokes",
        timestamps: true,
    }
);
