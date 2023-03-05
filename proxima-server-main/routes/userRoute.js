const express = require("express");
const { loginUser, signupUser } = require("../controllers/userController");
//router
const router = express.Router();

//Login--http://localhost:5000/api/user/login
router.post("/login", loginUser);

//SignUp--http://localhost:5000/api/user/signup
router.post("/signup", signupUser);

module.exports = router;
