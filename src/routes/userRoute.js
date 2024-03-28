const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/createUser", userController.createUser);
router.get("/getById/:user_id", userController.getById);
router.get(
  "/getByPhoneNumber/:phone_number",
  userController.getByPhoneNumber
);

module.exports = router;
