import axios from "../../api/Config";
import { loadusers } from "../../store/reducers/UserReducer"; // ✅ Replace with actual import

export const asyncCurrentUser = () => async (dispatch) => {
  try {
    const response = await axios.post(
      "/api/current-user",
      {},
      { withCredentials: true } // ✅ send cookies
    );

    if (response.data) {
      dispatch(loadusers(response.data.user)); 
      return true;
    } else {
      console.log("No user found");
      return false;
    }
  } catch (err) {
    console.error("Error fetching current user:", err);
    return false;
  }
};


export const asyncregisteruser = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/register`, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (response.data) {
      dispatch(asyncCurrentUser());
      return { success: true, message: response.data.message };
    }
    return { success: false, message: "Unknown error" };
  } catch (err) {
    const errorMsg = err.response?.data?.message || "Something went wrong";
    return { success: false, message: errorMsg };
  }
};


export const asyncloginuser = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/login`, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (response.data) {
      dispatch(asyncCurrentUser());
      return { success: true, message: response.data.message };
    }
    return { success: false, message: "Unknown error" };
  } catch (err) {
    const errorMsg = err.response?.data?.message || "Something went wrong";
    return { success: false, message: errorMsg };
  }
};

