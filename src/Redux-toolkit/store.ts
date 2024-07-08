import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import recipeReducer from "./Slices/RecipeSlice";
import mealplaneReducer from "./Slices/MealSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    recipe: recipeReducer,
    meal: mealplaneReducer,
  },
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
export { store };
