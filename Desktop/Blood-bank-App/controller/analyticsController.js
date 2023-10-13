const mongoose = require("mongoose");
const inventoryModel = require("../model/inventoryModel");
// const inventoryModel = require("../model/inventoryModel");
// const userModel = require("../model/userModel");

const bloodGroupDetailsController = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "B+", "B-", "A+", "A-"];
    const bloodGroupData = [];
    const organization = new mongoose.Types.ObjectId(req.body.userId);

    // get single Blood Group
    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        // Count Total in
        const totalIn = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "in",
              organization,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        // Count Total OUT
        const totalOut = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "out",
              organization,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        //CALCULATE TOTAL
        const availableBlood = totalIn[0]?.total || 0;

        //     PUSH DATA
        bloodGroupData.push({
          bloodGroup,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          availableBlood,
        });
      })
    );
    return res.status(200).send({
      success: true,
      message: "Blood group data Fetch successfully",
      bloodGroupData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In BloodGroup Data Analytics API",
      error,
    });
  }
};

module.exports = {
  bloodGroupDetailsController,
};
