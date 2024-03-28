const express = require("express");
const savedRouteController = require("../controllers/savedRoute.controller");

const router = express.Router();

router.get("/allSavedRoute", savedRouteController.getAll);

module.exports = router;
