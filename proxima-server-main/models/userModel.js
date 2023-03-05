const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //normal password encrypt for use hasing and use laibary(bcrypt)
const validator = require("validator"); //check email,password ok or not

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    uniqe: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }

  //Lowercase, uppercase, number, 8+ chars
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password is not strong try to combined Lowercase, uppercase, number, 8+ chars"
    );
  }

  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("Email already used");
  }

  //encrypt password or hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //create an user
  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorract email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
