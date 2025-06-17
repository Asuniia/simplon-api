import fs from "fs";
import path from "path";
import db from "@/libs/database";

async function rollbackMigrations() {
    const migrationsPath = path.resolve("database", "migrations");
    const migrationFiles = fs
        .readdirSync(migrationsPath)
        .filter((file) => file.endsWith(".ts"))
        .sort()
        .reverse();

    const queryInterface = db.getQueryInterface();

    for (const file of migrationFiles) {
        console.log(`Rolling back migration ${file}...`);
        const migration = await import(path.join(migrationsPath, file));
        if (migration.down) {
            await migration.down(queryInterface);
        } else {
            console.warn(`Migration ${file} has no down method`);
        }
    }
    console.log("All migrations rolled back.");
    await db.close();
}

rollbackMigrations().catch((err) => {
    console.error(err);
    process.exit(1);
});
