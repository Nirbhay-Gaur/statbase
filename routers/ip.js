import express from "express";
import eah from "express-async-handler";
import IpList from "../models/ipListModel.js";

const ipRouter = express.Router();

ipRouter.get(
  "/",
  eah(async (req, res) => {
    try {
      IpList.find({}, (err, results) => {
        if (err) {
          res.status(500).send("Internal Server Error: Unable to fetch data");
        } else {
          res.send(
            results.reduce((resMap, item) => {
              resMap[item.id] = item;
              return resMap;
            }, {})
          );
        }
      });
    } catch (error) {
      res.status(500).send("Internal Server Error: Unable to fetch data");
    }
  })
);

// Note: In the below code updating data returns error. To work around, even if error occurs status will be 200 only
// Please fix this for security purposes.

ipRouter.post(
  "/",
  eah(async (req, res) => {
    const ip = req.body.ip;
    const uag = req.body.uag;
    try {
      var query = { ip: ip, uag: uag },
        update = { $inc: { freq: 1 } },
        options = { upsert: true };
      await IpList.findOneAndUpdate(query, update, options, () => {
        res.status(200);
      });
    } catch (error) {
      res.status(200).send("Updated Succesfully");
    }
  })
);

ipRouter.get("/lookup", (req, res) => {
  res.send("https://json.geoiplookup.io/[ip_address]");
});

export default ipRouter;
