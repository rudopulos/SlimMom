const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calculator = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    BMR: { type: Number },
    forbiddenCategories: { type: Array },
    height: {
      type: Number,
      required: [true, "Required"],
    },
    age: {
      type: Number,
      required: true,
    },
    currentWeight: {
      type: Number,
      required: true,
    },
    desiredWeight: {
      type: Number,
      required: true,
    },
    bloodType: { type: String, required: true },
  },
  { timestamps: true }
);

const FormData = mongoose.model("calculator", calculator);
module.exports = FormData;
