import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosinstance";
import toast from "react-hot-toast";
const initialState = {};
export const CreateMealplane: any = createAsyncThunk(
  "/meal/create",
  async (formData) => {
    try {
      const response = await axiosInstance.post(`/mealplan/create`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log("Error in createmealplane");
      toast.error("failed to create mealplane");
      throw new Error("failed to create mealplan")
    }
  }
);
const MealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
export const {} = MealSlice.actions;
export default MealSlice.reducer;
