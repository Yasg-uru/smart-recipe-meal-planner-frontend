import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../InterfaceTypes/RootstateInterface";
import {
  compareRecipeWIthDailyGoals,
  getRecipesbyPagination,
} from "../../Redux-toolkit/Slices/RecipeSlice";
import "./../../helper/customeDatepicker.css";
const GetRecipes: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { Recipes } = useSelector((state: RootState) => state.recipe);
  const isCreatePath = location.pathname;
  console.log("this is a location path", location.pathname);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMealPlanning, setIsMealPlanning] = useState<boolean>(false);
  const [recipeSelection, setRecipeSelection] = useState<boolean[]>([]);
  const [selectionStatus, setSelectionStatus] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<string[]>([]);

  const {
    PaginationInfo: { hasNextPage, hasPrevPage },
  } = useSelector((state: RootState) => state.recipe);

  const HandlePreviousClick = () => {
    if (hasPrevPage) {
      setCurrentPage((page) => page - 1);
    }
  };
  const HandleNextClick = () => {
    if (hasNextPage) {
      setCurrentPage((page) => page + 1);
    }
  };
  const HandleCheckBoxChange = (index: number) => {
    setRecipeSelection((prev) =>
      prev.map((selected, i) => {
        return index === i ? !selected : selected;
      })
    );
    const recipeId = Recipes[index]._id;
    if (recipeId) {
      setSelectedRecipe((prev) =>
        prev.includes(recipeId?.toString())
          ? prev.filter((id) => id !== recipeId)
          : [...prev, recipeId]
      );
    }
  };
  useEffect(() => {
    dispatch(getRecipesbyPagination(currentPage));
  }, [currentPage]);
  useEffect(() => {
    setRecipeSelection(new Array(Recipes.length).fill(false));
  }, [Recipes]);
  console.log(
    "this is your boolean array and selected recipe ids :",
    selectedRecipe
  );
  console.log(
    "this is your boolean array and selected recipe ids :",
    recipeSelection
  );
  function handleCompareClick(id: string): void {
    dispatch(compareRecipeWIthDailyGoals(id));

    navigate("/compare", {
      state: {
        id,
      },
    });
  }

  return (
    <div className="bg-black min-h-screen flex flex-col gap-2 p-3 ">
      {isCreatePath === "/recipes" && (
        <button
          type="button"
          onClick={() => navigate("/create")}
          className="btn text-green-500 bg-black hover:bg-black hover:text-red-500 border-[0.5px] hover:border-red-500   "
        >
          Contribute Your Recipe
        </button>
      )}

      {!selectionStatus ? (
        <button
          type="button"
          onClick={() => {
            setSelectionStatus(true);
          }}
          className="btn text-green-500 bg-black hover:bg-black hover:text-red-500 border-[0.5px] hover:border-red-500   "
        >
          Select Recipes for Mealplan
        </button>
      ) : (
        <div className="join w-full grid grid-flow-col grid-cols-2">
          <button
            onClick={() => {
              setSelectionStatus(false);
            }}
            type="button"
            className="btn btn-join text-green-500 bg-black hover:bg-black hover:text-red-500 border-[0.5px] hover:border-red-500   "
          >
            Back
          </button>
          <button
            onClick={() =>
              navigate("/review", {
                state: {
                  selectedRecipe,
                },
              })
            }
            type="button"
            className="btn btn-join text-green-500 bg-black hover:bg-black hover:text-red-500 border-[0.5px] hover:border-red-500   "
          >
            Go For Mealplan of selected Recipes
          </button>
        </div>
      )}

      <div className="flex flex-row flex-wrap gap-3 mx-auto">
        {Recipes.length > 0 &&
          Recipes.map((recipe, index) => (
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
                {selectionStatus && (
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-accent"
                        onChange={() => HandleCheckBoxChange(index)}
                        value={selectedRecipe[index]}
                      />
                    </label>
                  </div>
                )}
                <div className="card-actions justify-end w-full">
                  <div className="flex justify-between w-full">
                    <p>{recipe.Likes} Likes</p>
                    <div className="flex gap-5">
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
                      <button
                        onClick={() => handleCompareClick(recipe._id)}
                        type="button"
                        className="btn bg-black border-[0.5px] font-bold border-green-500 hover:bg-black hover:border-red-500 text-green-500 hover:text-red-500 ring ring-green-500 ring-offset-1"
                      >
                        Compare
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {
        <div className="join mx-auto ">
          <button
            onClick={HandlePreviousClick}
            type="button"
            className="join-item btn font-bold text-2xl bg-black text-green-500 hover:bg-black hover:text-red-500 border-[0.5px] border-green-500 hover:border-pink-500"
          >
            «
          </button>
          <button
            type="button"
            className="join-item btn  bg-black text-green-500 hover:bg-black hover:text-red-500 border-[0.5px] border-green-500 hover:border-pink-500"
          >
            Page {currentPage}
          </button>
          <button
            onClick={HandleNextClick}
            type="button"
            className="join-item btn font-bold text-2xl bg-black text-green-500 hover:bg-black hover:text-red-500 border-[0.5px] border-green-500 hover:border-pink-500"
          >
            »
          </button>
        </div>
      }
    </div>
  );
};

export default GetRecipes;
