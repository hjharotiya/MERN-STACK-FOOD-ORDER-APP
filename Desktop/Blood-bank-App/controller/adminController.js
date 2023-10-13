const userModel = require("../model/userModel");

// *********** GET DONOR LIST **************

const getDonorListController = async (req, res) => {
  try {
    const userData = await userModel
      .find({ role: "donor" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Donor List Fetch successfully",
      userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Donor List",
      error,
    });
  }
};
// *********** GET HOSPITAL LIST **************

const getHospitalListController = async (req, res) => {
  try {
    const userData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Hospital List Fetch successfully",
      userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Donor List",
      error,
    });
  }
};
// *********** GET ORGANIZATION LIST **************
const getOrganizationListController = async (req, res) => {
  try {
    const userData = await userModel
      .find({ role: "organization" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "organization List Fetch successfully",
      userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Donor List",
      error,
    });
  }
};

// ******** DELETE DELETE ***********

const deleteDonorController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "donor deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting donor",
    });
  }
};
// ******** HOSPITAL DELETE ***********

const deleteHospitalController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Hospital deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting Hospital",
    });
  }
};
// ******** ORG DELETE DONOR ***********

const deleteORGController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Organization deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting Organization",
    });
  }
};

module.exports = {
  deleteDonorController,
  getDonorListController,
  getOrganizationListController,
  getHospitalListController,
  deleteHospitalController,
  deleteORGController,
};
