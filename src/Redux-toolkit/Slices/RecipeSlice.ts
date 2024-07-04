import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosinstance";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
const initialState = {};
export const createrecipe: any = createAsyncThunk(
  "/createrecipe",
  async (formdata) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/recipe/create",
        formdata,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      // toast.error(axiosError?.response?.data.message )
      toast.error("error is occured in create recipe ");
    }
  }
);
const RecipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
export const {} = RecipeSlice.actions;
export default RecipeSlice.reducer;
