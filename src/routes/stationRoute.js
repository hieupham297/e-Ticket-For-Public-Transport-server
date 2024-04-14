const express = require("express");
const stationController = require("../controllers/station.controller");

const router = express.Router();

router.get("/allStation", stationController.getAll);
router.get("/getByCode/:station_code", stationController.getByCode);

module.exports = router;
