export interface mealplanForm {
  startDate: Date;
  endDate: Date;
  meals: [
    {
      day: Date;
      recipes: string[];
    }
  ];
}
