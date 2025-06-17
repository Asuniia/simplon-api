import db from "@/libs/database";
import express from "express";
import bodyParser from "body-parser";
import jokes_routes from "@/routes/jokes";
import docs_routes from "@/routes/docs";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use("/api/v1/jokes", jokes_routes);
app.use("/docs", docs_routes);

db.sync().then(() => {
    app.listen(PORT, () => console.log(`API URL : http://localhost:${PORT}`));
});
