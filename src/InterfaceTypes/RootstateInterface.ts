import { AuthState } from "../Redux-toolkit/Slices/authSlice";
import { mealplaneInitialState } from "./Mealplan/mealplanestate";
import { RecipeGet } from "./Recipe/CreateRecipeFormData";
import { ShoppingListState } from "./shoppingList/createShoppingList";
export interface RootState {
  auth: AuthState;
  recipe:RecipeGet;
  meal:mealplaneInitialState;
  shopping:ShoppingListState;
}
