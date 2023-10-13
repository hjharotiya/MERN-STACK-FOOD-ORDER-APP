const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const ConnectDB = require("./config/db");
const path = require("path");
//.. dotenv config...
dotenv.config();

ConnectDB();

// first object
const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes
// 1 test app
app.get("/api/v1/test", (req, res) => {
  res.status(200).json({ message: "hey this is blood bank app" });
});
app.use("/api/v1/auth", require("./routes/authRouter"));
app.use("/api/v1/inventory", require("./routes/inventoryRouter"));
app.use("/api/v1/analytics", require("./routes/analytics"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// STATIC FOLDER
app.use(express.static(path.join(__dirname, "./client/dist")));

// STATIC ROUTE

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

// port
const PORT = process.env.PORT || 8080;

// listen

app.listen(PORT, () => {
  console.log(
    `Node server is running In ${process.env.DEV_MODE} modeOn Port ${process.env.PORT}`
      .bgBlue.white
  );
});
