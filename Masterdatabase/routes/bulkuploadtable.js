const express = require("express");
const router = express.Router();
const passport = require("passport");


const mongoose = require("mongoose");

const schema = mongoose.Schema;


const bulkuploadschema = new schema({
  email: String,
  username : String,
  password : String,
  roles : String
});

const bulkuploadModel = mongoose.model("bulkupload", bulkuploadschema);

router.post("/addnewuser", (req, res) => {
  const newpost = new bulkuploadModel({
    email : req.body.email,
    username: req.body.username,
    password: req.body.password,
    roles: req.body.roles
  });
  newpost.save(function (err) {
    if (!err) {
      res.send("New User added successfully");
    } else {
      res.send(err);
    }
  });
});

router.get("/getUsers", (req, res) => {
    bulkuploadModel.find({}, function (docs, err) {
      if (!err) {
        res.send(docs);
      } else {
        res.send(err);
      }
    });
  });

  // module.exports ={
  //   router: routers,
  //   SignupModel : mongoose.model('signups',signupschema)
  // };
   module.exports = router;
   module.exports = mongoose.model('bulkupload',bulkuploadschema);
  // module.exports = SignupModel

  // module.exports = {
  //   router,
  //   mongoose.model('signups',signupschema)
  // }