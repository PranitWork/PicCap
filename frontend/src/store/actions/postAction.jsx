import axios from "../../api/Config";
import { loadCaption, setLoading, setError } from "../reducers/PostReducer";

export const asyncUploadImageAndGetCaption = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.post("/api/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    });

    console.log("Upload response:", response.data);

    // Check both top-level caption and nested post.caption
    const caption =
      response.data?.caption || response.data?.post?.caption || null;

    if (caption) {
      dispatch(loadCaption(caption));
      return { caption }; // Ensure the return always has a caption property
    } else {
      dispatch(setError("No caption found."));
      return null;
    }
  } catch (error) {
    console.error("Upload error:", error);
    dispatch(setError("Error generating caption."));
    return null;
  }
};

