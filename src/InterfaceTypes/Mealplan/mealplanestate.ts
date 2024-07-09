export interface mealplaneInitialState {
  ShoppingList: ShoppingList[];
  meals: meals[];
  Pagination: paginationDetails;
}
export interface paginationDetails {
  hasPrevPage: boolean;
  hasNextPage: boolean;
}
export interface meals {
  startDate: string;
  endDate: string;
  meals: {
    day: string;
    recipes: string[];
  }[];
}

export interface ShoppingList {
  name: string;
  quantity: string;
  isChecked: boolean;
}
