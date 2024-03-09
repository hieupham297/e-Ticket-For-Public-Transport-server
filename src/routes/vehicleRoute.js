const express = require("express");
const vehicleController = require("../controllers/vehicle.controller");

const router = express.Router();

router.get("/allVehicles", vehicleController.getAll);

module.exports = router;
