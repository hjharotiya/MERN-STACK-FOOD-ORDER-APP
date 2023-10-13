const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonorController,
  getHospitalController,
  getOrganizationController,
  getOrganizationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controller/inventoryController");

const router = express.Router();

// routes
// ADD INVENTORY || POST
router.post("/create-inventory", authMiddleware, createInventoryController);

// GET ALL BLOOD RECORDS || GET
router.get("/get-inventory", authMiddleware, getInventoryController);

// GET RECENT BLOOD RECORDS || GET
router.get(
  "/get-recent-inventory",
  authMiddleware,
  getRecentInventoryController
);

// GET HOSPITAL BLOOD RECORDS || GET
router.post(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHospitalController
);

// GET ALL DONORS
router.get("/get-donors", authMiddleware, getDonorController);

// GET ALL HOSPITAL
router.get("/get-hospitals", authMiddleware, getHospitalController);

// GET ALL ORGANIZATION
router.get("/get-organization", authMiddleware, getOrganizationController);
// GET ALL ORGANIZATION
router.get(
  "/get-organization-for-hospital",
  authMiddleware,
  getOrganizationForHospitalController
);

module.exports = router;
