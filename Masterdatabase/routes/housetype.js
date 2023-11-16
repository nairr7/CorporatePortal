const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const schema = mongoose.Schema;

const postschema = new schema({
  houseTypeId: String,
  houseTypeName : String
});

const housetypeModel = mongoose.model("housetypes", postschema);

router.post("/addnewhousetype", (req, res) => {
  const newpostht = new housetypeModel({
    houseTypeId : req.body.houseTypeId,
    houseTypeName: req.body.houseTypeName
  });
  newpostht.save(function (err) {
    if (!err) {
      res.send("New houseType added successfully");
    } else {
      res.send(err);
    }
  });
});

router.get("/gethousetypes", (req, res) => {
  housetypeModel.find({}, function (docs, err) {
    if (!err) {
      res.send(docs);
    } else {
      res.send(err);
    }
  });
});

router.post("/gethousetypesdata", (req, res) => {
  housetypeModel.find({houseTypeId : req.body.houseTypeId }, (docs, err) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send(err);
    }
  });
});

router.post("/updatehousetypes", (req, res) => {
  housetypeModel.findOneAndUpdate(
    { houseTypeId : req.body.houseTypeId },
    {
      houseTypeName: req.body.houseTypeName
    },
    (err) => {
      if (!err) {
        res.send("houseType Updated Successfully");
      } else {
        res.send(err);
      }
    }
  );
});

router.post("/deletehousetype", (req, res) => {
  housetypeModel.findOneAndDelete({ houseTypeId : req.body.houseTypeId }, (err) => {
    if (!err) {
      res.send("houseType Deleted Successfullyy");
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
