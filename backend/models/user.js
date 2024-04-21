const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  height: Number,
  age: Number,
  currentWeight: Number,
  desiredWeight: Number,
  bloodType: String,
});

userSchema.post("save", function (doc, next) {
  console.log("new user was created", doc);
  next();
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  console.log("user about to be created & saved", this);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
