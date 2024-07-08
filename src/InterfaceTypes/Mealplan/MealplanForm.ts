export interface mealplanForm {
  startDate: string;
  endDate: string;
  meals: {
    day: string;
    recipes: string[];
  }[];
}
