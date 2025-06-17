import fs from "node:fs";
import path from "node:path";

function createMigration(name: string) {
    const timestamp = Date.now();
    const fileName = `${timestamp}-${name}.ts`;
    const migrationsDir = path.resolve("database", "migrations");

    if (!fs.existsSync(migrationsDir)) {
        fs.mkdirSync(migrationsDir);
    }

    const template = `import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface) {
}

export async function down(queryInterface: QueryInterface) {
}
`;

    const filePath = path.join(migrationsDir, fileName);
    fs.writeFileSync(filePath, template, { encoding: "utf-8" });
    console.log(`Migration created: ${fileName}`);
}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Usage: tsx app/commands/create-migration.ts <migration-name>");
    process.exit(1);
}

const migrationName = args[0];
createMigration(migrationName);
