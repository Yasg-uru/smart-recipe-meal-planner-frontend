import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosinstance";
import toast from "react-hot-toast";
import {
  mealplaneInitialState,
  ShoppingList,
} from "../../InterfaceTypes/Mealplan/mealplanestate";
function loadData() {
  const savedData = sessionStorage.getItem("shoppinglist");
  if (savedData) {
    return JSON.parse(savedData);
  }
  return null;
}
function savelistdata(dataToSave: ShoppingList[]) {
  sessionStorage.setItem("shoppinglist", JSON.stringify(dataToSave));
}
const initialState: mealplaneInitialState = {
  ShoppingList: loadData() || [],
};

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
      throw new Error("failed to create mealplan");
    }
  }
);
const MealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(CreateMealplane.fulfilled, (state, action) => {
      state.ShoppingList = action.payload.ShoppingList;
      savelistdata(state.ShoppingList);
    });
  },
});
export const {} = MealSlice.actions;
export default MealSlice.reducer;
