const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const sendVerificationEmail = require("../controller/emailController");

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const signup = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();
    const token = jwt.sign({ userId: user._id }, " jwtSecret", {
      expiresIn: "1h",
    });

    user.token = token;
    await user.save();
    const verificationLink = `http://localhost:3000/api/verify-email?token=${token}`;
    await sendVerificationEmail(email, verificationLink);
    res.status(201).json({
      user: user._id,
      token,
      message:
        "User registered successfully. Please check your email to verify.",
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: "Email in use" });
    } else {
      res.status(400).json(error);
    }
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    user.token = token;
    await user.save();

    res.json({
      token,
      user: { email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const logout = async (req, res) => {
  try {
    const user = req.user;
    user.token = null;
    await user.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = { login, signup, logout };
