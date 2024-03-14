const express = require("express");
const vehicleRouteController = require("../controllers/vehicleRoute.controller");

const router = express.Router();

router.get("/allBusRoute", vehicleRouteController.getAllBusRoute);
router.get("/allMetroRoute", vehicleRouteController.getAllMetroRoute);

module.exports = router;
