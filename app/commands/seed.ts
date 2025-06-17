import fs from "fs";
import path from "path";
import db from "@/libs/database";

async function runSeeders() {
    const seedersPath = path.resolve("database", "seeders");
    const seederFiles = fs.readdirSync(seedersPath).filter((file) => file.endsWith(".ts"));

    const queryInterface = db.getQueryInterface();

    for (const file of seederFiles) {
        console.log(`Running seeder ${file}...`);
        const seeder = await import(path.join(seedersPath, file));
        if (typeof seeder.default === "function") {
            await seeder.default(queryInterface);
        } else if (typeof seeder.run === "function") {
            await seeder.run(queryInterface);
        } else {
            console.warn(`No valid seeder function in ${file}`);
        }
    }

    console.log("All seeders done.");
    await db.close();
}

runSeeders().catch((err) => {
    console.error("Seeder error:", err);
    process.exit(1);
});
