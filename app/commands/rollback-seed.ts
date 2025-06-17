import fs from "fs";
import path from "path";
import db from "@/libs/database";

async function rollbackSeeders() {
    const seedersPath = path.resolve("database", "seeders");
    const seederFiles = fs
        .readdirSync(seedersPath)
        .filter((file) => file.endsWith(".ts"))
        .sort()
        .reverse();

    const queryInterface = db.getQueryInterface();

    for (const file of seederFiles) {
        console.log(`Rolling back seeder ${file}...`);
        const seeder = await import(path.join(seedersPath, file));

        if (seeder.down) {
            await seeder.down(queryInterface);
        } else {
            console.warn(`No valid rollback function (down/undo) in ${file}`);
        }
    }

    console.log("All seeders rolled back.");
    await db.close();
}

rollbackSeeders().catch((err) => {
    console.error("Rollback seeder error:", err);
    process.exit(1);
});
