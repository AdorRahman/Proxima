const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  //sign(payload= use obj,secret,opctional) //secreat pas use from avas
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "7d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//signup
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = {
  loginUser,
  signupUser,
};
