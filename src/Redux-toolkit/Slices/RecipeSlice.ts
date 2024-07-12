import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosinstance";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { RecipeGet } from "../../InterfaceTypes/Recipe/CreateRecipeFormData";
import { AdjustInterface } from "../../components/recipes/RecipeDetail";
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
  AllRecipes: [],
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
export const GetRecipesByMissinIngredients: any = createAsyncThunk(
  "/recipe/searchbymissingingredients",
  async (MissingIngredients) => {
    try {
      const response = await axiosInstance.post(
        `/recipe/bymissing?MissingIngredients`,
        {
          MissingIngredients,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      toast.error("failed to search by missingingredients");
    }
  }
);
export const GetAdjustedRecipe: any = createAsyncThunk(
  "/recipe/adjusted",
  async (formData: AdjustInterface) => {
    console.log("this is formdata in adjust interface :", formData);
    try {
      const response = await axiosInstance.get(
        `/recipe/adjusted?recipeId=${formData.recipeId}&persons=${formData.persons}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error in getadjusted recipe");
      toast.error("failed to get adjusted recipe");
    }
  }
);
export const LikeRecipe: any = createAsyncThunk(
  "/recipe/like",
  async (recipeId) => {
    try {
      const response = await axiosInstance.put(
        `/recipe/like/${recipeId}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error in Likerecipe");
      toast.error("error in like recipe ");
    }
  }
);
export const GetallRecipes: any = createAsyncThunk(
  "/get/all/recipe",
  async () => {
    try {
      const response = await axiosInstance.get("/recipe/", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log("Error in get all recipes ", error);
      toast.error("failed to get all recipes ");
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
    builder.addCase(
      GetRecipesByMissinIngredients.fulfilled,
      (state, action) => {
        state.Recipes = action?.payload.Recipesfiltered;
        savestate(state.Recipes as unknown as RecipeGet[]);
      }
    );
    builder.addCase(GetAdjustedRecipe.fulfilled, (state, action) => {
      const index = state.Recipes.findIndex(
        (recipe) =>
          recipe._id?.toString() ===
          action?.payload?.AdjustedRecipe._id.toString()
      );
      if (index !== -1) {
        state.Recipes[index] = action?.payload?.AdjustedRecipe;
        savestate(state.Recipes as unknown as RecipeGet[]);
      }
    });
    builder.addCase(LikeRecipe.fulfilled, (state, action) => {
      const index = state.Recipes.findIndex(
        (recipe) =>
          recipe._id?.toString() === action.payload.recipe._id.toString()
      );
      if (index !== -1) {
        state.Recipes[index] = action?.payload.recipe;
        savestate(state.Recipes as unknown as RecipeGet[]);
      }
    });
    builder.addCase(GetallRecipes.fulfilled, (state, action) => {
      state.AllRecipes = action?.payload?.recipes;
    });
  },
});
export const {} = RecipeSlice.actions;
export default RecipeSlice.reducer;
