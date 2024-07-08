export interface mealplaneInitialState {
    ShoppingList:ShoppingList[];
}

export interface ShoppingList {
  name: string;
  quantity: string;
  isChecked: boolean;
}
