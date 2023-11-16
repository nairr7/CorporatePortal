const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const schema = mongoose.Schema;

const postschema = new schema({
  orgId: String,
  orgName : String
});

const orgModel = mongoose.model("organizations", postschema);

router.post("/addneworg", (req, res) => {
  const newpostog = new orgModel({
    orgId : req.body.orgId,
    orgName: req.body.orgName
  });
  newpostog.save(function (err) {
    if (!err) {
      res.send("New org added successfully");
    } else {
      res.send(err);
    }
  });
});

router.get("/getorg", (req, res) => {
  orgModel.find({}, function (docs, err) {
    if (!err) {
      res.send(docs);
    } else {
      res.send(err);
    }
  });
});

router.post("/getorgdata", (req, res) => {
  orgModel.find({orgId : req.body.orgId }, (docs, err) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send(err);
    }
  });
});

router.post("/updateorg", (req, res) => {
  orgModel.findOneAndUpdate(
    { orgId : req.body.orgId },
    {
        orgName: req.body.orgName
    },
    (err) => {
      if (!err) {
        res.send("orgUpdated Successfully");
      } else {
        res.send(err);
      }
    }
  );
});

router.post("/deleteorg", (req, res) => {
  orgModel.findOneAndDelete({ orgId : req.body.orgId }, (err) => {
    if (!err) {
      res.send("org Deleted Successfullyy");
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
