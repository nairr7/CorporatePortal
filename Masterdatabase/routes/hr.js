const express = require("express");
const router = express.Router();
const passport = require("passport");


const mongoose = require("mongoose");

const schema = mongoose.Schema;

const hrschema = new schema({
  price : String

});

const hrModel = mongoose.model("hr", hrschema);

router.post("/addhrdata", (req, res) => {
  const newpost = new hrModel({
    price : req.body.price
   
  });
  newpost.save(function (err) {
    if (!err) {
      res.send(" Data sent successfully");
    } else {
      res.send(err);
    }
  });
});

router.get("/gethrdata", (req, res) => {
    hrModel.find({}, function (docs, err) {
      if (!err) {
        res.send(docs);
      } else {
        res.send(err);
      }
    });
  });



module.exports = router;