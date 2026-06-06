const express = require("express");

const {
  getAllLgas,
  getLgaResults,
} = require("../controllers/TempController");

const router = express.Router();

router.get("/", getAllLgas);

router.get("/:id/results", getLgaResults);

module.exports = router;