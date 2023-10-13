const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  bloodGroupDetailsController,
} = require("../controller/analyticsController");

const router = express.Router();

// routes
// Blood group data
router.get("/bloodGroups-data", authMiddleware, bloodGroupDetailsController);

module.exports = router;
