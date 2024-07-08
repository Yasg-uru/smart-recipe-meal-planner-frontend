import { AuthState } from "../Redux-toolkit/Slices/authSlice";
import { mealplaneInitialState } from "./Mealplan/mealplanestate";
import { RecipeGet } from "./Recipe/CreateRecipeFormData";
export interface RootState {
  auth: AuthState;
  recipe:RecipeGet;
  meal:mealplaneInitialState;
}
