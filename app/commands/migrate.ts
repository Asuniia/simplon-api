import fs from "fs";
import path from "path";
import db from "@/libs/database";

async function runMigrations() {
    const migrationsPath = path.resolve("database", "migrations");
    const migrationFiles = fs.readdirSync(migrationsPath).filter((file) => file.endsWith(".ts"));

    const queryInterface = db.getQueryInterface();

    for (const file of migrationFiles) {
        console.log(`Running migration ${file}...`);
        const migration = await import(path.join(migrationsPath, file));
        if (migration.up) {
            await migration.up(queryInterface);
        }
    }
    console.log("All migrations done.");
    await db.close();
}

runMigrations().catch((err) => {
    console.error(err);
    process.exit(1);
});
