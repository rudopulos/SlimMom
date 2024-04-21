const FormData = require("../models/calculator");

const calculatorData = async (req, res) => {
  try {
    const formData = new FormData(req.body);
    await formData.save();
    res.status(201).json(formData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = calculatorData;
