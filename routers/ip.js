import express from "express";
import eah from "express-async-handler";
import { isAuth } from "../config/helper/helper.js";
import IpList from "../models/ipListModel.js";
import browserDetect from "../static/js/browserDetector.js";

const ipRouter = express.Router();

// GET Route helper function
const getCount = (results) => {
  const data = {
    totalFreq: 0,
    uniqueFreq: results.length,
  };
  results.forEach((el) => {
    data.totalFreq += el.freq;
  });

  return data;
};

ipRouter.get(
  "/",
  isAuth,
  eah((req, res) => {
    try {
      IpList.find({})
        .sort([["updatedAt", -1]])
        .exec((err, results) => {
          if (err) {
            res.status(500).send("Internal Server Error: Unable to fetch data");
          } else {
            // res.send(
            //   results.reduce((resMap, item) => {
            //     resMap[item.id] = item;
            //     return resMap;
            //   }, {})
            // );
            res.render("dashboard", {
              counts: getCount(results),
              results: results,
              utils: browserDetect,
            });
          }
        });
    } catch (error) {
      res.status(500).send("Internal Server Error: Unable to fetch data");
    }
  })
);

// Note: In the below code updating data returns error.
// To work around, even if error occurs status will be 200 only
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

ipRouter.get("/:ip", (req, res) => {
  const ip = req.params.ip;
  if (!ip && typeof ip !== "string") {
    res.status(404).send("invalid IP address");
  } else {
    res.redirect(`https://json.geoiplookup.io/${ip}`);
  }
});

export default ipRouter;
