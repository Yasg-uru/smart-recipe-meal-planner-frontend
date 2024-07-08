import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { mealplanForm } from "../../InterfaceTypes/Mealplan/MealplanForm";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../InterfaceTypes/RootstateInterface";
import { CreateMealplane } from "../../Redux-toolkit/Slices/MealSlice";
const ReviewMealPlan: React.FC = () => {
  const location = useLocation();
  const [recipeList, setRecipeList] = useState<any[]>(() => {
    const savedData = sessionStorage.getItem("recipelist");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [Recipe, setRecipes] = useState<any[]>([]);
  const [isMealPlanCreated, setIsMealPlanCreated] = useState<boolean>(false);

  const { Recipes } = useSelector((state: RootState) => state.recipe);
  const navigate = useNavigate();
  console.log("this is a recipe list after reload:", recipeList);

  const [MealPlans, setMealPlans] = useState<mealplanForm>({
    startDate: "",
    endDate: "",
    meals: [],
  });
  console.log("this is a mealplan ", MealPlans);
  useEffect(() => {
    const selectedrecipe = location.state?.selectedRecipe;
    if (selectedrecipe) {
      sessionStorage.setItem("recipelist", JSON.stringify(selectedrecipe));
    }
    setRecipeList(location.state?.selectedRecipe);
  }, [location.state]);
  useEffect(() => {
    if (MealPlans.startDate && MealPlans.endDate) {
      const days = generateDaysArray(MealPlans.startDate, MealPlans.endDate);
      //after that we need to get the meals array from this
      const Meals = days.map((day) => ({ day, recipes: [] }));
      setMealPlans({
        ...MealPlans,
        meals: Meals,
      });
    }
  }, [MealPlans.startDate, MealPlans.endDate]);
  useEffect(() => {
    if (recipeList.length > 0) {
      const filteredRecipes = Recipes.filter((recipe) =>
        recipeList.includes(recipe._id)
      );

      setRecipes(filteredRecipes);
      console.log("this is a recipes :", filteredRecipes);
    }
  }, [Recipes]);
  const generateDaysArray = (startDate: string, endDate: string) => {
    const days: string[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let d: Date = start; d <= end; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d).toISOString().split("T")[0]);
    }
    return days;
  };
  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMealPlans({
      ...MealPlans,
      [name]: value,
    });
  };
  const handleRecipechange = (day: string, recipeId: string) => {
    setMealPlans({
      ...MealPlans,
      meals: MealPlans.meals.map((meal) =>
        meal.day === day
          ? {
              ...meal,
              recipes: meal.recipes.includes(recipeId)
                ? meal.recipes.filter((id) => id !== recipeId)
                : [...meal.recipes, recipeId],
            }
          : meal
      ),
    });
  };

  //filtering the recipes by their ids

  console.log("this is a recipelist :", recipeList);
  const dispatch = useDispatch();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(CreateMealplane(MealPlans));
    setIsMealPlanCreated(true);
  }

  return (
    <div className="bg-black min-h-screen flex flex-col gap-2 p-3">
      <h1 className="text-pink-500 text-center text-2xl font-bold ">
        Review Meal plan
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="date"
          name="startDate"
          value={MealPlans.startDate}
          onChange={handleDataChange}
          className="input input-bordered text-green-500 font-bold border-[0.5px] bg-black focus:border-red-500 border-green-500 rounded-lg"
        />
        <input
          type="date"
          name="endDate"
          value={MealPlans.endDate}
          onChange={handleDataChange}
          className="input input-bordered text-green-500 font-bold border-[0.5px] bg-black focus:border-red-500 border-green-500 rounded-lg"
        />
        {MealPlans.meals.map((meal, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h2 className="text-green-500">{meal.day}</h2>
            <div className="flex flex-row flex-wrap gap-3 mx-auto">
              {Recipe.map((recipe, index) => (
                <div
                  key={index}
                  className="card bg-base-100 image-full w-96 shadow-xl"
                >
                  <figure>
                    <img
                      src="https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Curry-recipe.jpg"
                      alt="Recipe"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{recipe.title}</h2>
                    <p>{recipe.description}</p>

                    <div className="form-control">
                      <label className="cursor-pointer label">
                        <span className="label-text">Remember me</span>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-accent"
                          onChange={() =>
                            handleRecipechange(meal.day, recipe._id)
                          }
                        />
                      </label>
                    </div>

                    <div className="card-actions justify-end w-full">
                      <div className="flex justify-between w-full">
                        <p>{recipe.Likes} Likes</p>
                        <button
                          onClick={() =>
                            navigate("/detail", {
                              state: {
                                recipeid: recipe._id,
                              },
                            })
                          }
                          type="button"
                          className="btn bg-black border-[0.5px] font-bold border-green-500 hover:bg-black hover:border-red-500 text-green-500 hover:text-red-500 ring ring-green-500 ring-offset-1"
                        >
                          full info
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="btn text-green-500 bg-black hover:bg-black hover:text-red-500 border-[0.5px] hover:border-red-500"
        >
          Save Meal Plan
        </button>
        {isMealPlanCreated && (
          <button
            type="button"
            className="btn text-green-500 bg-black hover:bg-black hover:text-red-500 border-[0.5px] hover:border-red-500"
          >
            Generate Shopping List
          </button>
        )}
      </form>
    </div>
  );
};
export default ReviewMealPlan;
