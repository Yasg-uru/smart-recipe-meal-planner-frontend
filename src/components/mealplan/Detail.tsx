import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetallRecipes } from "../../Redux-toolkit/Slices/RecipeSlice";
import { RootState } from "../../InterfaceTypes/RootstateInterface";
import { useLocation, useNavigate } from "react-router-dom";
import { createRecipe } from "../../InterfaceTypes/Recipe/CreateRecipeFormData";
import { deleteMeal, GetYourMeals } from "../../Redux-toolkit/Slices/MealSlice";

const Detail: React.FC = () => {
  //in this component i need to render the all the reccipes of the meals and then creating the editor for managing the meal now
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const MealId = location.state?.id;

  const { AllRecipes } = useSelector((state: RootState) => state.recipe);
  const { meals } = useSelector((state: RootState) => state.meal);

  useEffect(() => {
    dispatch(GetallRecipes());
  }, [AllRecipes]);
  //after this we need to filter the array of recipes for finding full details about the recipes
  const [FilteredRecipe, setFilteredRecipe] = useState<createRecipe[]>([]);
  if (!MealId) {
    return (
      <div className="min-h-screen bg-black text-white">
        Internal server error
      </div>
    );
  }
  const meal = meals.find((meal) => meal._id?.toString() === MealId.toString());
  console.log("this is a meal", meal);
  //now filtering the recipes
  if (!meal) {
    return (
      <div className="min-h-screen bg-black text-white">
        Internal server error
      </div>
    );
  }
  const mealRecipeIds = meal?.meals.flatMap((meal) =>
    meal.recipes.map((recipe) => recipe.toString())
  );
  const UniqueRecipeIds = [...new Set(mealRecipeIds)];
  useEffect(() => {
    if (AllRecipes.length > 0 && UniqueRecipeIds.length > 0) {
      setFilteredRecipe(
        AllRecipes.filter((recipe) =>
          UniqueRecipeIds.includes(recipe._id?.toString())
        )
      );
    }
  }, [AllRecipes, UniqueRecipeIds]);
  const handleRecipeFind = (recipeId: string) => {
    const Recipe = FilteredRecipe.find(
      (recipe) => recipe._id.toString() === recipeId
    );
    return (
      Recipe && (
        <div className="card bg-base-100 image-full w-96 shadow-xl">
          <figure>
            <img
              src="https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Curry-recipe.jpg"
              alt="Recipe"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{Recipe.title}</h2>
            <p>{Recipe.description}</p>

            <div className="card-actions justify-end w-full">
              <div className="flex justify-between w-full">
                <p>{Recipe?.Likes} Likes</p>
                <button
                  onClick={() =>
                    navigate("/detail", {
                      state: {
                        recipeid: Recipe._id,
                        ComponentType:"Meal_Detail"
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
      )
    );
  };
  const handledelete = (mealId: string) => {
    dispatch(deleteMeal(mealId));
    dispatch(GetYourMeals());
    navigate("/meals");
  };
  console.log("this is a filtered recipes :", FilteredRecipe);
  return (
    <div className="bg-black min-h-screen text-white p-3 flex flex-col gap-2 items-center ">
      <button
        type="button"
        onClick={() => handledelete(meal._id)}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out hover:scale-110"
      >
        <svg
          className="w-6 h-6 inline-block mr-2 -mt-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
        Delete
      </button>

      <h1 className="text-green-500 text-2xl text-center font-bold ">
        Meal Plan Details
      </h1>
      <div className="flex justify-around w-full">
        <div className="text-green-500 font-bold text-xl">
          {new Date(meal.startDate).toDateString()}
        </div>
        <svg
          className="w-6 h-6 animate-ping text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-1.293-1.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
        <div className="text-green-500 font-bold text-xl">
          {new Date(meal.endDate).toDateString()}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-green-500 font-bold text-xl">Meals</h1>
        {meal.meals.map((meal) => (
          <div className="flex flex-col gap-2">
            <p className="text-pink-500 font-bold text-xl">
              {new Date(meal.day).toDateString()}
            </p>
            {meal.recipes.map((recipe) => handleRecipeFind(recipe))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;
