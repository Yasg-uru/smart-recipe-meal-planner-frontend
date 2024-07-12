import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../InterfaceTypes/RootstateInterface";
import { AiFillLike } from "react-icons/ai";
import {
  GetAdjustedRecipe,
  GetallRecipes,
  LikeRecipe,
} from "../../Redux-toolkit/Slices/RecipeSlice";
export interface AdjustInterface {
  recipeId: string;
  persons: number;
}

const RecipeDetail: React.FC = () => {
  const location = useLocation();

  const { recipeid } = location.state;
  const { AllRecipes } = useSelector((state: RootState) => state.recipe);
  useEffect(() => {
    dispatch(GetallRecipes());
  }, [AllRecipes]);
  let Recipe = AllRecipes.find((recipe) => recipe._id?.toString() === recipeid);
  if (!location.state?.ComponentType) {
    const { Recipes } = useSelector((state: RootState) => state.recipe);
    Recipe = Recipes.find((recipe) => recipe._id?.toString() === recipeid);
  }

  const loadServings = () => {
    const serving = sessionStorage.getItem("serving");
    if (serving) {
      return parseInt(serving);
    } else {
      return Recipe?.NumberofPersons || 1;
    }
  };
  const [servings, setServings] = useState<number>(loadServings());

  const dispatch = useDispatch();

  console.log("this is a recipe :", Recipe);
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Recipe?._id) {
      dispatch(GetAdjustedRecipe({ recipeId: Recipe._id, persons: servings }));
    }
  };
  const handlechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setServings(parseInt(value));
  };
  useEffect(() => {
    loadServings();
  }, [Recipe]);
  return (
    <div className="bg-black min-h-screen flex flex-col gap-2 items-center p-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="number"
          name="servings"
          value={servings}
          onChange={handlechange}
          className="text-green-500 font-bold bg-black focus:bg-black border-[0.5px] border-green-500 focus:border-red-500 rounded-md"
        />
        <button
          type="submit"
          className="btn text-green-500 bg-black hover:bg-black hover:text-red-500 border-[0.5px] hover:border-red-500   "
        >
          change
        </button>
      </form>
      <h1 className="text-center font-bold text-2xl text-pink-500">
        {Recipe?.title} for {servings} servings
      </h1>
      <p className="text-green-500 text-center">{Recipe?.description}</p>
      <div className="flex flex-col gap-1 items-center w-full">
        <h1 className="text-pink-500 font-bold text-center text-xl">
          Ingredients
        </h1>
        {Recipe?.ingredients.map((ingredient) => (
          <div className="text-white flex gap-5  w-full h-[40px]">
            <p className="text-green-500">{ingredient.name}</p> =&gt;
            <p className="text-green-500">{ingredient.quantity}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 items-center w-full">
        <h1 className="text-pink-500 font-bold text-center text-xl">
          Instructions
        </h1>
        {Recipe?.instructions.map((instruction) => {
          return (
            <div className="flex gap-5 w-full h-[40px]">
              <p className="text-green-500">{instruction.step}</p>
              <p className="text-green-500">{instruction.description}</p>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 flex-col">
        <h1 className="text-center text-pink-500 font-bold text-xl">
          DietryLabels
        </h1>
        {Recipe?.dietaryLabels.map((label) => (
          <p className="text-green-500">{label}</p>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p className="flex gap-2">
          <span className="text-pink-500 font-bold">MealType</span>{" "}
          <span className="text-white">=&gt;</span>
          <span className="text-green-500">{Recipe?.mealType}</span>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="flex gap-2">
          <span className="text-pink-500 font-bold">Cuisine</span>{" "}
          <span className="text-white">=&gt;</span>
          <span className="text-green-500">{Recipe?.cuisine}</span>
        </p>
      </div>
      <div className="w-full">
        <table className="border-green-500 border-[0.5px] min-w-full  bg-black  rounded-3xl">
          <thead className="bg-black">
            <tr>
              <th className="px-6 py-3 text-left   tracking-wider font-bold text-xl text-pink-500">
                Nutrient
              </th>
              <th className="px-6 py-3 text-left    tracking-wider font-bold text-xl text-pink-500">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-black text-green-500">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Calories</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {Recipe?.nutritionalInfo.calories} kcal
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Protein</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {Recipe?.nutritionalInfo.protein} g
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Carbohydrates</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {Recipe?.nutritionalInfo.carbohydrates} g
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Fats</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {Recipe?.nutritionalInfo.fats} g
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Vitamins</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {Recipe?.nutritionalInfo.vitamins.join(", ")}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Minerals</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {Recipe?.nutritionalInfo.minerals.join(", ")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        onClick={() => dispatch(LikeRecipe(Recipe?._id))}
        className="flex justify-between cursor-pointer"
      >
        <p className="flex items-center gap-2 text-green-500">
          <span>
            <AiFillLike />
          </span>
          <span>{Recipe?.Likes}</span>
        </p>
      </div>
    </div>
  );
};

export default RecipeDetail;
