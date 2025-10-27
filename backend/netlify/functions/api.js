// backend/netlify/functions/api.js
import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import routes from "../../routes"; // kalau CJS pakai: const routes = require("../../routes");

const app = express();

// CORS aman untuk preflight
app.use(cors({ origin: true, credentials: true }));
app.options(/.*/, cors());  

app.use(express.json());

// MOUNT di root, BUKAN "/api"
app.use("/", routes);

// health
app.get("/hello", (_req, res) => res.send("Hello World!"));

export const handler = serverless(app);
