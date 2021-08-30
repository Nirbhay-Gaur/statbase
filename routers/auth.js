import express from "express";
import eah from "express-async-handler";
import path from "path";

const authRouter = express.Router();

const __dirname = path.resolve();

const USER = process.env.USER;
const PASSWD = process.env.PASSWD;

authRouter.get("/", (req, res) => {
  res.render("login");
});

authRouter.post(
  "/",
  eah(async (req, res) => {
    const { user, passwd } = req.body;
    if (!user || typeof user !== "string") {
      return res.status(422).send("Invalid UserID");
    }
    if (!passwd || typeof passwd !== "string") {
      return res.status(422).send("Invalid Password");
    }

    //console.log(user, passwd);
    try {
      if (user === USER && passwd === PASSWD) {
        res.redirect("/api/iplist");
      } else {
        res.status(401).send("Incorrect UserID / Password");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  })
);

export default authRouter;
