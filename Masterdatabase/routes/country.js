const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const schema = mongoose.Schema;

const postschema = new schema({
  countryId: String,
  countryName : String
});

const PostModel = mongoose.model("countries", postschema);

router.post("/addnewcountry", (req, res) => {
  PostModel.findOne().sort("-countryId").exec((err, val) => {
    if (err) {
      console.log(err);
    } else {
      let seqId = val ? parseInt(val.countryId) + 1 : 1;
      // res.render("addnewcountry", { nextCountryID: nextCountryID });
     
      const newpost = new PostModel({
        countryId: seqId.toString(),
        countryName: req.body.countryName
      });
 
      newpost.save(function (err) {
        if (!err) {
          res.send("New Country added successfully");
        } else {
          res.send(err);
        }
      });
    }
  });
});

// router.post("/addnewcountry", (req, res) => {
//   const newpost = new PostModel({
//     countryId : req.body.countryId,
//     countryName: req.body.countryName
//   });
//   newpost.save(function (err) {
//     if (!err) {
//       res.send("New Country added successfully");
//     } else {
//       res.send(err);
//     }
//   });
// });

router.get("/getcountries", (req, res) => {
  PostModel.find({}, function (docs, err) {
    if (!err) {
      res.send(docs);
    } else {
      res.send(err);
    }
  });
});

router.post("/getcountrydata", (req, res) => {
  PostModel.find({countryId : req.body.countryId }, (docs, err) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send(err);
    }
  });
});

router.post("/updatecountry", (req, res) => {
  PostModel.findOneAndUpdate(
    { countryId : req.body.countryId },
    {
        countryName: req.body.countryName
    },
    (err) => {
      if (!err) {
        res.send("country Updated Successfully");
      } else {
        res.send(err);
      }
    }
  );
});

router.post("/deletecountry", (req, res) => {
  PostModel.findOneAndDelete({ countryId : req.body.countryId }, (err) => {
    if (!err) {
      res.send("Country Deleted Successfullyy");
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
