const express = require("express");
const vehicleRouteController = require("../controllers/vehicleRoute.controller");

const router = express.Router();

router.get("/allBusRoute/:user_id", vehicleRouteController.getAllBusRoute);
router.get("/allMetroRoute/:user_id", vehicleRouteController.getAllMetroRoute);

module.exports = router;
