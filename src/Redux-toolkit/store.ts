import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice"
import recipeReducer from "./Slices/RecipeSlice"
const store=configureStore({
    reducer:{
        auth:authReducer,
        recipe:recipeReducer
    }
})
// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
export default store;