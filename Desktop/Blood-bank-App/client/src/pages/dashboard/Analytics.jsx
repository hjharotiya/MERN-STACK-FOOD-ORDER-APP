import React, { useEffect, useState } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#98E4FF",
    "#940B92",
    "#005B41",
    "#176B87",
    "#FF8080",
    "#CCC8AA",
    "#F5F5DC",
    "#E5D283",
  ];
  // GET BLOOD GROUP DATA

  const bloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // lifecycle method
  useEffect(() => {
    bloodGroupData();
  }, []);

  // GET BLOOD GROUP DATA

  const RecentBloodGroupData = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
        console.log(inventoryData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // lifecycle method
  useEffect(() => {
    RecentBloodGroupData();
  }, []);

  return (
    <>
      <Header />

      <div className="d-flex flex-row flex-wrap">
        {data?.map((record, i) => (
          <div
            className="card m-2 p-1"
            style={{ width: "17rem", backgroundColor: `${colors[i]}` }}
            key={record.bloodGroup}
          >
            <div className="card-body">
              <h1 className="card-title bg-light tex-dark text-center mb-3 ">
                {record.bloodGroup}
              </h1>
              <p className="card-text">
                Total in: <b> {record.totalIn}</b>
              </p>
              <p className="card-text">
                Total in: <b> {record.totalIn}</b>
              </p>
            </div>
            <div className="card-footer text-light bg-dark text-center">
              Total Available :<b>{record.availableBlood}</b>
            </div>
          </div>
        ))}
      </div>
      <div className="container mt-3">
        <h1 className="my-3">Recent Inventory </h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Time & Date</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData?.map((record) => (
              <tr key={record._id}>
                <td>{record.name || record.organizationName + "(ORG)"}</td>
                <td>{record.email}</td>
                <td>{record.phone} </td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;
