const mongoose = require("mongoose");
const inventoryModel = require("../model/inventoryModel");
const userModel = require("../model/userModel");

//********** */ CREATE INVENTORY *********
const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    //   Validation
    console.log(email);
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not Found");
    }
    // if (inventoryType === "in" && user.role !== "donor") {
    //   throw new Error("Not a donor Account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a Hospital");
    // }

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organization = new mongoose.Types.ObjectId(req.body.userId);
      // calculate Blood Quantity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);

      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      console.log("Total in", totalIn);

      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;
      console.log("total out", totalOut);
      // in & out calc
      const availableQuantityOfBloodGroup = totalIn - totalOut;
      console.log("available", availableQuantityOfBloodGroup);

      // quantity validation
      if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityOfBloodGroup} ML of ${requestedBloodGroup} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donor = user?._id;
    }

    // SAVE RECORD
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "new Blood record is Added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating API",
      error,
    });
  }
};

// ********* GET ALL BLOOD RECORDS *******

const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      .populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get Inventory",
      error,
    });
  }
};
//************* */ GET BLOOD RECORD OF 3 **************
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({ organization: req.body.userId })
      .limit(3)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "recent Inventory data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in recent inventory",
      error,
    });
  }
};

// ********* GET HOSPITAL BLOOD RECORDS **********

const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donor")
      .populate("hospital")
      .populate("organization")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get Hospital consumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get Inventory",
      error,
    });
  }
};

// ******** GET DONOR RECORDS **********
const getDonorController = async (req, res) => {
  try {
    const organization = req.body.userId;
    // find orders
    const donorId = await inventoryModel.distinct("donor", { organization });
    console.log(donorId);

    const donors = await userModel.find({ _id: { $in: donorId } });
    res.status(200).send({
      success: true,
      message: "Donor fetched successfully ",
      donors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Donor Records",
      error,
    });
  }
};

// *********** GET HOSPITAL ************

const getHospitalController = async (req, res) => {
  try {
    const organization = req.body.userId;
    //  GET HOSPITAL DATA
    const hospitalId = await inventoryModel.distinct("hospital", {
      organization,
    });
    //  FIND HOSPITAL
    const hospitals = await userModel.find({
      _id: { $in: hospitalId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospital Data Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching Hospital",
      error,
    });
  }
};

// **** get organization  ***

const getOrganizationController = async (req, res) => {
  try {
    const donor = req.body.userId;
    const orgId = await inventoryModel.distinct("organization", { donor });

    // find org
    const organizations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "ORG is successfully fetched",
      organizations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in ORG api",
      error,
    });
  }
};
const getOrganizationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organization", { hospital });

    // find org
    const organizations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: " hospital ORG is successfully fetched",
      organizations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in ORG api",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getInventoryHospitalController,
  getDonorController,
  getHospitalController,
  getOrganizationController,
  getOrganizationForHospitalController,
  getRecentInventoryController,
};
