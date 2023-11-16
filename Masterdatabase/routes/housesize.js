const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const schema = mongoose.Schema;

const postschema = new schema({
  housesizeId: String,
  housesizeName : String
});

const housesizeModel = mongoose.model("housesizes", postschema);

router.post("/addnewhousesize", (req, res) => {
  const newposths = new housesizeModel({
    housesizeId : req.body.housesizeId,
    housesizeName: req.body.housesizeName
  });
  newposths.save(function (err) {
    if (!err) {
      res.send("New housesize added successfully");
    } else {
      res.send(err);
    }
  });
});

router.get("/gethousesizes", (req, res) => {
  housesizeModel.find({}, function (docs, err) {
    if (!err) {
      res.send(docs);
    } else {
      res.send(err);
    }
  });
});

router.post("/gethousesizesdata", (req, res) => {
  housesizeModel.find({housesizeId : req.body.housesizeId }, (docs, err) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send(err);
    }
  });
});

router.post("/updatehousesizes", (req, res) => {
  housesizeModel.findOneAndUpdate(
    { housesizeId : req.body.housesizeId },
    {
      housesizeName: req.body.housesizeName
    },
    (err) => {
      if (!err) {
        res.send("housesize Updated Successfully");
      } else {
        res.send(err);
      }
    }
  );
});

router.post("/deletehousesize", (req, res) => {
  housesizeModel.findOneAndDelete({ housesizeId : req.body.housesizeId }, (err) => {
    if (!err) {
      res.send("housesize Deleted Successfullyy");
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
