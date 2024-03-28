const express = require("express");
const wishlistController = require("../controllers/wishlist.controller");

const router = express.Router();

router.post("/addNewItem", wishlistController.addNewItem);
router.post("/removeItem", wishlistController.removeItem);

module.exports = router;
