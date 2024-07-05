import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../InterfaceTypes/RootstateInterface";
import { useNavigate } from "react-router-dom";
import {
  GetRecipesByMissinIngredients,
  getrecipesBysearchBar,
} from "../../Redux-toolkit/Slices/RecipeSlice";
import { useState } from "react";
import toast from "react-hot-toast";
export interface queryinterface {
  query: string;
  queryType: "normal" | "missingingredient";
}
const Navbar: React.FC = () => {
  const imageurl = "";
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [queryDetails, setQueryDetails] = useState<queryinterface>({
    query: "",
    queryType: "normal",
  });

  const handlesubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (queryDetails.query) {
      if (queryDetails.queryType === "normal") {
        dispatch(getrecipesBysearchBar(queryDetails.query));
        navigate("/recipes");
      } else if (queryDetails.queryType === "missingingredient") {
        dispatch(GetRecipesByMissinIngredients(queryDetails.query));
        navigate("/recipes");
      }
    } else {
      toast.error("please write your query");
    }
  };
  const handlechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (queryDetails.queryType === "normal") {
      setQueryDetails({
        ...queryDetails,
        [name]: value,
      });
    } else {
      setQueryDetails({
        ...queryDetails,
        [name]: value.split(","),
      });
    }
  };
  const handleQueryTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setQueryDetails({
      ...queryDetails,
      queryType: value as "normal" | "missingingredient",
    });
  };
  console.log("this is a query details :", queryDetails);
  return (
    <nav className="flex justify-between border-b-[0.5px]  border-green-500 bg-black  items-center  p-5 h-24 ">
      <div className="flex gap-5 ">
        <span
          onClick={() => navigate("/")}
          className="text-green-500 text-lg font-semibold cursor-pointer"
        >
          Home
        </span>
        <span
          onClick={() => navigate("/recipes")}
          className="text-green-500 text-lg font-semibold cursor-pointer"
        >
          Recipes
        </span>
        <span className="text-green-500 text-lg font-semibold cursor-pointer">
          Meal Planner
        </span>
        <span className="text-green-500 text-lg font-semibold cursor-pointer">
          Shopping Lists
        </span>
      </div>
      <div className="px-6 flex gap-2">
        <form onSubmit={handlesubmit} className="flex gap-2">
          <input
            type="text"
            name="query"
            value={queryDetails.query}
            onChange={handlechange}
            placeholder={`${
              queryDetails.queryType === "normal"
                ? "search query"
                : "write (comma separated values)"
            }`}
            className="input input-bordered w-full max-w-xs bg-black border-[0.5px] border-green-500 text-green-500"
          />
          <select
            name="queryType"
            value={queryDetails.queryType}
            onChange={handleQueryTypeChange}
            className="bg-black border-[0.5px] border-green-500 text-green-500"
          >
            <option value="normal">Normal</option>
            <option value="missingingredient">Missing Ingredient</option>
          </select>
          <button type="submit" className="btn bg-green-500 text-white">
            Search
          </button>
        </form>

        {!isAuthenticated ? (
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {imageurl ? (
                  <img alt="nothing" src={imageurl} />
                ) : (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu  rounded-box z-[1] w-52 p-2 shadow bg-black text-white"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="btn bg-black text-green-500 border-[0.5px] border-green-500 hover:bg-black hover:text-red-500 hover:border-red-500"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
