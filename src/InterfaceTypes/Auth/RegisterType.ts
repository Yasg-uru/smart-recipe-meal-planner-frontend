export interface RegisterFormInterface {
  Name: string;
  Email: string;
  password: string;
  allergies: string[];
  dietaryPreferences: string[];
  nutritionalGoals: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fats: number;
    vitamins: string[];
    minerals: string[];
  };
}
