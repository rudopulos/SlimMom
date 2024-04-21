const express = require("express");
const router = express.Router();
const calculatorController = require("../../controller/calculatorController");

router.post("/", calculatorController);

module.exports = router;
