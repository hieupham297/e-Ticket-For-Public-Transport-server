const express = require("express");
const userRoute = require("../routes/userRoute");
const vehicleRoute = require("../routes/vehicleRoute");
const stationRoute = require("../routes/stationRoute");

const router = express.Router();

router.use("/api/user", userRoute);
router.use("/api/vehicle_route", vehicleRoute);
router.use("/api/station", stationRoute);

module.exports = router;
