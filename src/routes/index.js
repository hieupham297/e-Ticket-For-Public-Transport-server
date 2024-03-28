const express = require("express");
const userRoute = require("../routes/userRoute");
const vehicleRoute = require("../routes/vehicleRoute");
const stationRoute = require("../routes/stationRoute");
const adRoute = require("../routes/advertisementRoute");
const savedRoute = require("../routes/savedRoute");
const wishlistRoute = require("../routes/wishlistRoute");

const router = express.Router();

router.use("/api/user", userRoute);
router.use("/api/vehicle_route", vehicleRoute);
router.use("/api/station", stationRoute);
router.use("/api/advertisement", adRoute);
router.use("/api/saved_route", savedRoute);
router.use("/api/wishlist_route", wishlistRoute);

module.exports = router;
