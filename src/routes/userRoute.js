const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.get("/allUser", userController.getAllUsers);
router.post("/createUser", userController.createUser);

module.exports = router;
