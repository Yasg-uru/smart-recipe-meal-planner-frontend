import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../InterfaceTypes/RootstateInterface";
import { useLocation } from "react-router-dom";
import { compareRecipeWIthDailyGoals } from "../../Redux-toolkit/Slices/RecipeSlice";

// Register necessary components for Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// const comparedInfo = {
//   calories: 100,
//   protein: 44,
//   carbohydrates: 71,
//   fats: 22,
//   vitamins: [true, true],
//   minerals: [false],
// };
// const dailyGoals = {
//   calories: 12,
//   protein: 45,
//   carbohydrates: 56,
//   fats: 67,
//   vitamins: ["vitamin A", "vitamin D"],
//   minerals: ["Calcium", "Iron"],
// };
// const recipe = {
//     calories: 400,
//     protein: 20,
//     carbohydrates: 40,
//     fats: 15,
//     vitamins: ["vitamin A", "vitamin D"],
//     minerals: ["Calcium, Iron"],
// };

const CompareRecipewithDailyGoals = () => {
  const { comparedInfo, dailyGoals } = useSelector(
    (state: RootState) => state.recipe
  );
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state && location.state.id) {
      const { id } = location.state;

      dispatch(compareRecipeWIthDailyGoals(id));
    }
  }, [comparedInfo, dailyGoals, location.state]);
  // Function to prepare pie chart data for comparedInfo
  const preparePieData = (label: string, percentage: number) => {
    return {
      labels: [`${label} (${percentage}%)`, "DailyGoal"],
      datasets: [
        {
          data: [percentage, 100 - percentage],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          hoverBackgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="bg-black min-h-screen p-8 text-white">
      <h2 className="text-4xl font-bold text-center mb-8">
        Recipe vs Daily Goals Comparison
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-80 h-80   p-4">
          <h3 className="text-xl font-semibold text-center mb-4">Calories</h3>
          <Pie
            data={preparePieData("Calories", comparedInfo.calories)}
            options={options}
          />
        </div>
        <div className="w-80 h-80 p-4">
          <h3 className="text-xl font-semibold text-center mb-4">Protein</h3>
          <Pie
            data={preparePieData("Protein", comparedInfo.protein)}
            options={options}
          />
        </div>
        <div className="w-80 h-80  p-4">
          <h3 className="text-xl font-semibold text-center mb-4">
            Carbohydrates
          </h3>
          <Pie
            data={preparePieData("Carbohydrates", comparedInfo.carbohydrates)}
            options={options}
          />
        </div>
        <div className="w-80 h-80  p-4">
          <h3 className="text-xl font-semibold text-center mb-4">Fats</h3>
          <Pie
            data={preparePieData("Fats", comparedInfo.fats)}
            options={options}
          />
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Vitamins Comparison</h3>
        <ul className="list-disc list-inside space-y-2">
          {dailyGoals.vitamins.map((vitamin, index) => (
            <li key={index}>
              {vitamin}:{" "}
              {comparedInfo.vitamins[index]
                ? "Present in Recipe"
                : "Not in Recipe"}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Minerals Comparison</h3>
        <ul className="list-disc list-inside space-y-2">
          {dailyGoals.minerals.map((mineral, index) => (
            <li key={index}>
              {mineral}:{" "}
              {comparedInfo.minerals[index]
                ? "Present in Recipe"
                : "Not in Recipe"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompareRecipewithDailyGoals;
