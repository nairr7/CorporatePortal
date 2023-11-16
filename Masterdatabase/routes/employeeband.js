const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const schema = mongoose.Schema;

const postschema = new schema({
  EMId: String,
  EMName : String
});

const EmployeeBandModel = mongoose.model("employeebands", postschema);

router.post("/addnewEmployeeBand", (req, res) => {
  const newpost1 = new EmployeeBandModel({
    EMId : req.body.EMId,
    EMName: req.body.EMName
  });
  newpost1.save(function (err) {
    if (!err) {
      res.send("New EmployeeBand added successfully");
    } else {
      res.send(err);
    }
  });
});

router.get("/getEmployeeBand", (req, res) => {
  EmployeeBandModel.find({}, function (docs, err) {
    if (!err) {
      res.send(docs);
    } else {
      res.send(err);
    }
  });
});

router.post("/getEmployeeBanddata", (req, res) => {
  EmployeeBandModel.find({EMId : req.body.EMId }, (docs, err) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send(err);
    }
  });
});

router.post("/updateEmployeeBand", (req, res) => {
  EmployeeBandModel.findOneAndUpdate(
    { EMId : req.body.EMId },
    {
        EMName: req.body.EMName
    },
    (err) => {
      if (!err) {
        res.send("EmployeeBand Updated Successfully");
      } else {
        res.send(err);
      }
    }
  );
});

router.post("/deleteEmployeeBand", (req, res) => {
  EmployeeBandModel.findOneAndDelete({ EMId : req.body.EMId }, (err) => {
    if (!err) {
      res.send("EmployeeBand Deleted Successfullyy");
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
