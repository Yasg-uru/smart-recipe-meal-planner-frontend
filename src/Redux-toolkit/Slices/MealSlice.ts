import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosinstance";
import toast from "react-hot-toast";
import {
  mealplaneInitialState,
  meals,
  ShoppingList,
} from "../../InterfaceTypes/Mealplan/mealplanestate";
import { Mealsearchinterface } from "../../components/mealplan/GetMealplans";
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
function loadMealData() {
  const savedData = sessionStorage.getItem("meals");
  if (savedData) {
    return JSON.parse(savedData);
  }
  return null;
}
function saveMealsData(dataToSave: meals[]) {
  sessionStorage.setItem("meals", JSON.stringify(dataToSave));
}
const initialState: mealplaneInitialState = {
  ShoppingList: loadData() || [],
  meals: loadMealData() || [],
  Pagination: {
    hasNextPage: false,
    hasPrevPage: false,
  },
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
export const GetYourMeals: any = createAsyncThunk(
  "/meals",
  async (pagenumber) => {
    try {
      const response = await axiosInstance.get(
        `mealplan/meals?page=${pagenumber}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("error is occurred in the meals fetching data");
      toast.error("error is occured in fecthing the meals ");
      throw new Error("failed to fetch your meals");
    }
  }
);
export const deleteMeal: any = createAsyncThunk(
  "/meal/delete",
  async (mealId) => {
    try {
      const response = await axiosInstance.delete(
        `/mealplan/delete/${mealId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("error in delete meal ");
      toast.error("error is occured");
    }
  }
);
export const searchmeals: any = createAsyncThunk(
  "/mealplan/search",
  async (formdata: Mealsearchinterface) => {
    try {
      const response = await axiosInstance.get(
        `/mealplan/searchmeals?startDate=${formdata.startDate}&endDate=${formdata.endDate}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log("error in searchmeals ", error);
      toast.error("failed to search meals by start and enddate ");
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
    builder.addCase(GetYourMeals.fulfilled, (state, action) => {
      state.meals = action.payload.mealplanes.docs;
      state.Pagination.hasPrevPage = action.payload.hasPrevPage;
      state.Pagination.hasNextPage = action.payload.hasNextPage;
      saveMealsData(state.meals);
    });
    builder.addCase(searchmeals.fulfilled, (state, action) => {
      state.meals = action.payload.result;
      saveMealsData(state.meals);
      state.Pagination.hasNextPage = false;
      state.Pagination.hasPrevPage = false;
    });
  },
});
export const {} = MealSlice.actions;
export default MealSlice.reducer;
