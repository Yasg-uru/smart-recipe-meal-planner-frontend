export interface createshoppingList {
  items: {
    Name: string;
    quantity: string;
    isChecked?: boolean;
  };
}
export interface ShoppingListState {
  Lists: shoppingList[];
  Pagination:PaginationDetails;
  
}
export interface PaginationDetails {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
export interface shoppingList {
 
  _id: string;
  items: {
    name: string;
    quantity: string;
    isChecked: boolean;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
