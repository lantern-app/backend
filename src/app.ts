import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import prayerRouter from "./routes/prayer.router";
import allahNamesRouter from "./routes/allahNames.router";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());

app.get("/", (req, res) => {
    return res.json({ message: "Hello World!" });
});

app.use("/prayer", prayerRouter);
app.use("/allahNames", allahNamesRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`🚀 listening on ${port}...`);
});
