import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosinstance";
const initialState = {};

export const GenerateShoppinList:any = createAsyncThunk(
  "/shopping/generate",
  async (formData) => {
    try {
      const response = await axiosInstance.post("/shopping/create", formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error("Error in generating shoppinglist");
    }
  }
);
const ShoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
export default ShoppingSlice.reducer;
export const {} = ShoppingSlice.actions;
