const express = require("express");
const router = express.Router();
const user = require('../Models/User');
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = "HamzaTheGreat";

router.post("/createuser",

  body('email').isEmail(),
  body('name').isLength({ min: 3 }),
  body('password').isLength({ min: 5 }),



  
  async (req, res) => {
    console.log("User Created")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await user.create({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
        location: req.body.location
      });

      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

router.post("/loginuser", [
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const email = req.body.email;

  try {
    const userData = await user.findOne({ email });
    if (!userData) {
      return res.status(400).json({ errors: "Invalid Credentials" });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, userData.password);
    if (!passwordMatch) {
      return res.status(400).json({ errors: "Invalid Password Credentials" });
    }

    const data = {
      user: {
        id: userData.id
      }
    };

    const authToken = jwt.sign(data, secret);

    res.cookie('authToken', authToken, { httpOnly: true, maxAge: 7200000 }); // 2 hours expiration
    res.cookie('userName', userData.name, { maxAge: 7200000 }); // 2 hours expiration
    
    



    console.log("User SuccessFully loged in ")

    return res.json({ success: true, authToken,userName:userData.name });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

module.exports = router;
