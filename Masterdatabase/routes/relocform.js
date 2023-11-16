const express = require("express");
const router = express.Router();
const passport = require("passport");


const mongoose = require("mongoose");

const schema = mongoose.Schema;

const relocschema = new schema({
  // email: String,
  username : String,
  currentloc : String,
  currentlocexp : String,
  org : String,
  country : String,
  housetype : String,
  housesize : String
});

const RelocModel = mongoose.model("reloc", relocschema);

router.post("/addrelocdata", (req, res) => {
  const newpost = new RelocModel({
    // email : req.body.email,
    username: req.body.username,
    currentloc: req.body.currentloc,
    currentlocexp: req.body.currentlocexp,
    org: req.body.org,
    country : req.body.country,
    housetype: req.body.housetype,
    housesize: req.body.housesize
  });
  newpost.save(function (err) {
    if (!err) {
      res.send("Reloc Data sent successfully");
    } else {
      res.send(err);
    }
  });
});

router.get("/getrelocdata", (req, res) => {
    RelocModel.find({}, function (docs, err) {
      if (!err) {
        res.send(docs);
      } else {
        res.send(err);
      }
    });
  });



module.exports = router;