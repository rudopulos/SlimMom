const express = require("express");
const router = express.Router();
const diaryController = require("../../controller/diaryController");

router.post("/", diaryController);

module.exports = router;
