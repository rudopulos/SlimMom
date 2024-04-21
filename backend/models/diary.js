const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addFood = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    calories: { type: Number },
    category: {
      type: String,
      required: [true, "Required"],
    },
    grams: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const AddFood = mongoose.model("food", addFood);
module.exports = AddFood;
