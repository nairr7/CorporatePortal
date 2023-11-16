const express = require("express");
const router = express.Router();
const passport = require("passport");


const mongoose = require("mongoose");

const schema = mongoose.Schema;

const priceschema = new schema({
 country : String,
  price : String

});

const priceModel = mongoose.model("reqprice", priceschema);


router.get("/getpricedata", (req, res) => {
    priceModel.find({}, function (docs, err) {
      if (!err) {
        res.send(docs);
      } else {
        res.send(err);
      }
    });
  });


module.exports = router;