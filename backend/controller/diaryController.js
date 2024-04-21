const AddFood = require("../models/diary");

const addFood = async (req, res) => {
  try {
    const addFood = new AddFood(req.body);
    await addFood.save();
    res.status(201).json(addFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = addFood;
