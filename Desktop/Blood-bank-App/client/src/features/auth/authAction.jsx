import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/API";
import { toast } from "react-toastify";

// *************************
// ******* LOGIN *********
// **************************

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      // store token
      if (data.success) {
        if (role === "donor") {
          window.location.replace("/organization");
        } else {
          window.location.replace("/");
        }
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      }
      return data;
    } catch (error) {
      if (error.message && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// *************************
// ******* REGISTER *********
// **************************

export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      role,
      email,
      password,
      organizationName,
      website,
      address,
      phone,
      hospitalName,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
        name,
        role,
        email,
        password,
        organizationName,
        website,
        address,
        phone,
        hospitalName,
      });
      if (data.success) {
        toast.success(data.message);
        window.location.replace("/login");
      }
    } catch (error) {
      if (error.message && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// *********** CURRENT USER ************
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async ({ rejectWithValue }) => {
    try {
      const res = await API.get("/auth/current-user");
      if (res?.data) {
        return res?.data; //=> res && res.data
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
