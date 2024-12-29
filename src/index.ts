import "dotenv/config";

import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

import router from "./router";

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || "8080";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

mongoose.Promise = Promise;
mongoose.connect(DATABASE_URL);
mongoose.connection.on("error", (error: Error) =>
  console.log(`DB error: ${error}`)
);

app.use("/", router());
