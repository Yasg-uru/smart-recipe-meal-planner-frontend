import { Route, Routes } from "react-router-dom";
import Navbar from "./components/maincomponents/Navbar.tsx";
import Register from "./components/auth/Register.tsx";
import Login from "./components/auth/Login.tsx";
import Homepage from "./components/maincomponents/Homepage.tsx";
import GetRecipes from "./components/recipes/GetRecipes.tsx";
import CreateRecipe from "./components/recipes/CreateRecipe.tsx";
import RecipeDetail from "./components/recipes/RecipeDetail.tsx";
import ReviewMealPlan from "./components/mealplan/ReviewMealplan.tsx";
import GetMealplans from "./components/mealplan/GetMealplans.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail" element={<RecipeDetail/>}/>
        <Route path="/recipes" element={<GetRecipes />}>
        </Route>
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="/review" element={<ReviewMealPlan/>}/>
          <Route path="/meals" element={<GetMealplans/>}/>
      </Routes>
    </>
  );
}

export default App;
