/* eslint-disable no-console */
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

import sequelize from "database";
import { apiErrorHandler } from "errors/api-error.handler";
import allahNamesRouter from "routes/allahNames.router";
import prayerRouter from "routes/prayer.router";
import userRouter from "routes/user.router";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "Hello World!" });
});

app.use("/prayer", prayerRouter);
app.use("/allahNames", allahNamesRouter);
app.use("/user", userRouter);

app.use(apiErrorHandler);

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`🚀 listening on ${port}...`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
