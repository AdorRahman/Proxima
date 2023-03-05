const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//middleware funcation
const requireAuth = async (req, res, next) => {
  //varify authentiation
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id: id }).select("_id");
    next();
  } catch {
    res.status(401).json({ error: "Token is not authorized" });
  }
};

module.exports = requireAuth;
