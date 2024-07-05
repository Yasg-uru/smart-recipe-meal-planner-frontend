import { AuthState } from "../Redux-toolkit/Slices/authSlice";
import { RecipeGet } from "./Recipe/CreateRecipeFormData";
export interface RootState {
  auth: AuthState;
  recipe:RecipeGet
}
