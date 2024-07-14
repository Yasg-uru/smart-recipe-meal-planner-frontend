// import { Fragment } from "react/jsx-runtime"

// const RecipeComparasion:React.FC=()=>{

// }
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../InterfaceTypes/RootstateInterface";
import { CompareRecipes } from "../../Redux-toolkit/Slices/RecipeSlice";

const RecipeComparasion: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const comparedInfo = useSelector(
    (state: RootState) => state.recipe.RecipeComparasion
  );
  const { Recipe1Name, Recipe2Name } = location.state;

  useEffect(() => {
    if (location.state && location.state.RecipeIds) {
      const {
        RecipeIds: [recipe1, recipe2],
      } = location.state;
      //after this we need to dispatch an api
      dispatch(CompareRecipes({ recipe1, recipe2 }));
    }
  }, [RecipeComparasion, location.state]);

  const renderComparisonRow = (
    label: string,
    value: number,
    leader: string
  ) => (
    <tr>
      <td className="border px-4 py-2">{label}</td>
      <td className="border px-4 py-2">
        {value} {leader === "Recipe2" && "more than Recipe1"}{" "}
        {leader === "Recipe1" && "more than Recipe2"}
      </td>
      <td className="border px-4 py-2">{leader}</td>
    </tr>
  );

  return (
    <div className="bg-black min-h-screen flex flex-col gap-2 p-3 text-white">
      <h1 className="text-2xl text-green-500 mb-4">Recipe Comparison</h1>
      <div className="join">
        <button
          type="button"
          className="btn join-item text-green-500 h-3 bg-black hover:bg-black hover:text-red-500 border-[0.5px] border-green-500 hover:border-red-500"
        >
          Recipe1 : {Recipe1Name}
        </button>
        <button
          type="button"
          className="btn join-item text-green-500 h-3 bg-black hover:bg-black hover:text-red-500 border-[0.5px] border-green-500 hover:border-red-500"
        >
          Recipe2 : {Recipe2Name}
        </button>
      </div>
      <table className="table-auto w-full bg-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2">Nutrient</th>
            <th className="px-4 py-2">Value</th>
            <th className="px-4 py-2">Leader</th>
          </tr>
        </thead>
        <tbody>
          {renderComparisonRow(
            "Calories",
            comparedInfo.calories.value,
            comparedInfo.calories.leader
          )}
          {renderComparisonRow(
            "Protein",
            comparedInfo.protein.value,
            comparedInfo.protein.leader
          )}
          {renderComparisonRow(
            "Carbohydrates",
            comparedInfo.carbohydrates.value,
            comparedInfo.carbohydrates.leader
          )}
          {renderComparisonRow(
            "Fats",
            comparedInfo.fats.value,
            comparedInfo.fats.leader
          )}
        </tbody>
      </table>
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
        className="btn text-green-500 bg-black hover:bg-black hover:text-red-500 border-[0.5px] hover:border-red-500 w-auto mt-3"
      >Back</button>
    </div>
  );
};

export default RecipeComparasion;
