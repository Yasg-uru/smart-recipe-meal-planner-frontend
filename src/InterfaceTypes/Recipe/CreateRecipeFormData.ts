export interface ingredients {
  name: string;
  quantity: string;
}
export interface instructions {
  step: number;
  description: string;
}
export interface createRecipe {
  title: string;
  description: string;
  ingredients: ingredients[];
  instructions: instructions[];
  NumberofPersons: number;
  cuisine: string;
  mealType: string;
  dietaryLabels: string[];
  Likes?: number;
  _id: string;
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fats: number;
    vitamins: string[];
    minerals: string[];
  };
}

export interface RecipeGet {
  Recipes: createRecipe[];
  AllRecipes:createRecipe[];

  PaginationInfo: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
