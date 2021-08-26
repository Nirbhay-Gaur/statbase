import express from "express";
import ipRouter from "./routers/ip.js";
import db from "./config/db/db.js";

const app = express();

// connect to database
db();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api/iplist", ipRouter);

app.get("/", (req, res) => {
  res.send("Hello Peter!");
});

const PORT = 3000;
app.listen(process.env.PORT || PORT, () => {
  console.log("Server is up...");
});
