import express from "express";
import ipRouter from "./routers/ip.js";
import authRouter from "./routers/auth.js";
import db from "./config/db/db.js";
import path from "path";

const app = express();

// connect to database
db();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "static")));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api/iplist", ipRouter);
app.use("/api/login", authRouter);

app.get("/", (req, res) => {
  res.redirect("/api/login");
});

const PORT = 3000;
app.listen(process.env.PORT || PORT, () => {
  console.log("Server is up...");
});
