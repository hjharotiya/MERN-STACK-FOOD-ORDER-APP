const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getDonorListController,
  getHospitalListController,
  getOrganizationListController,
  deleteDonorController,
  deleteORGController,
  deleteHospitalController,
} = require("../controller/adminController");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Routes

// GET \\ DONOR LIST
router.get(
  "/donor-list",
  authMiddleware,
  adminMiddleware,
  getDonorListController
);
// GET \\ HOSPITAL LIST
router.get(
  "/hospital-list",
  authMiddleware,
  adminMiddleware,
  getHospitalListController
);
// GET \\ DONOR LIST
router.get(
  "/org-list",
  authMiddleware,
  adminMiddleware,
  getOrganizationListController
);

// DELETE \\ Organization
router.delete(
  "/delete-organization/:id",
  authMiddleware,
  adminMiddleware,
  deleteORGController
);
// DELETE \\ Hospital
router.delete(
  "/delete-hospital/:id",
  authMiddleware,
  adminMiddleware,
  deleteHospitalController
);
// DELETE \\ DONOR
router.delete(
  "/delete-donor/:id",
  authMiddleware,
  adminMiddleware,
  deleteDonorController
);

// export

module.exports = router;
