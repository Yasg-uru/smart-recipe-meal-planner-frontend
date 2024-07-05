import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosinstance";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { RecipeGet } from "../../InterfaceTypes/Recipe/CreateRecipeFormData";
const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("recipes");
    if (serializedState !== null) {
      return JSON.parse(serializedState);
    }
  } catch (error) {
    console.error("Could not load state", error);
  }
};
const savestate = (data: RecipeGet[]) => {
  try {
    const dataTosave = JSON.stringify(data);
    sessionStorage.setItem("recipes", dataTosave);
  } catch (error) {
    console.log("failed to save data in localstorage");
  }
};
const initialState: RecipeGet = {
  Recipes: loadState() || [],
  PaginationInfo: {
    hasNextPage: false,
    hasPrevPage: false,
  },
};
export const createrecipe: any = createAsyncThunk(
  "/createrecipe",
  async (formdata) => {
    try {
      const response = await axiosInstance.post("/recipe/create", formdata, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      // toast.error(axiosError?.response?.data.message )
      toast.error("error is occured in create recipe ");
    }
  }
);
export const getRecipesbyPagination: any = createAsyncThunk(
  "/recipe/get",
  async (pagenumber) => {
    try {
      const response = await axiosInstance.get(
        `recipe/bypagination?page=${pagenumber}`
      );
      return response.data;
    } catch (error) {
      toast.error("error is occured in fetching data ");
    }
  }
);
export const getrecipesBysearchBar: any = createAsyncThunk(
  "/recipe/get/search",
  async (query) => {
    try {
      const respopnse = await axiosInstance.get(
        `/recipe/bysearch?searchTerm=${query}`,
        {
          withCredentials: true,
        }
      );
      toast.success("fetched your searched query result");

      return respopnse.data;
    } catch (error) {
      toast.error("error is occured search recipe ");
    }
  }
);
const RecipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getrecipesBysearchBar.fulfilled, (state, action) => {
      state.Recipes = action.payload.recipes;
      savestate(state.Recipes as unknown as RecipeGet[]);
    });
    builder.addCase(getRecipesbyPagination.fulfilled, (state, action) => {
      state.Recipes = action.payload.recipes;
      savestate(state.Recipes as unknown as RecipeGet[]);
      state.PaginationInfo.hasNextPage = action?.payload?.recipes.hasNextPage;
      state.PaginationInfo.hasPrevPage = action?.payload?.recipes.hasPrevPage;
    });
  },
});
export const {} = RecipeSlice.actions;
export default RecipeSlice.reducer;
