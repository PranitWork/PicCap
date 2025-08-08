import axios from "../../api/Config";
import { loadusers } from "../reducers/UserReducer"; // ✅ Replace with actual import

export const asyncCurrentUser = () => async (dispatch) => {
  try {
    const response = await axios.post("/api/current-user");
    if (response.data) {
      dispatch(loadusers(response.data)); // ✅ You were dispatching with `users` which is undefined
    } else {
      console.log("No user found");
    }
  } catch (err) {
    console.error("Error fetching current user:", err);
  }
};

export const asyncregisteruser = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/register`, data);
    if (response.data) {
      console.log("User registered");
      dispatch(asyncCurrentUser());
    } else {
      console.log("Registration failed");
    }
  } catch (err) {
    console.error("Registration error:", err);
  }
};

export const asyncloginuser = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/login`, data);
    if (response.data) {
      dispatch(asyncCurrentUser());
      console.log("User logged in");
      return true;
    } else {
      console.log("Login failed");
      return false;
    }
  } catch (err) {
    console.error("Login error:", err);
    return false;
  }
};
