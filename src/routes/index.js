const express = require("express");
const userRoute = require("../routes/userRoute");
const vehicleRoute = require("../routes/vehicleRoute");

const router = express.Router();

router.use("/api/user", userRoute);
router.use("/api/vehicle", vehicleRoute);

module.exports = router;
