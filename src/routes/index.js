const express = require("express");
const userRoute = require("../routes/userRoute");
const vehicleRoute = require("../routes/vehicleRoute");
const stationRoute = require("../routes/stationRoute");
const adRoute = require("../routes/advertisementRoute");

const router = express.Router();

router.use("/api/user", userRoute);
router.use("/api/vehicle_route", vehicleRoute);
router.use("/api/station", stationRoute);
router.use("/api/advertisement", adRoute);

module.exports = router;
