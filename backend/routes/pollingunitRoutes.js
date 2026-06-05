const express = require("express");

const router = express.Router();

const {
  getPollingUnits,
  getPollingUnitResults,
  addPollingUnitResult,
  getWardsByLga,
  createPollingUnitAndResults,
} = require(
  "../controllers/pollingUnitController"
);

router.get("/", getPollingUnits);

router.get(
  "/lga/:lgaId/wards",
  getWardsByLga
);

router.post(
  "/create-full",
  createPollingUnitAndResults
);

router.post(
  "/results",
  addPollingUnitResult
);

router.get(
  "/:id/results",
  getPollingUnitResults
);

module.exports = router;