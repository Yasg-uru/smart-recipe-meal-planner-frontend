import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../InterfaceTypes/RootstateInterface";
import { getRecipesbyPagination } from "../../Redux-toolkit/Slices/RecipeSlice";

const GetRecipes: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { Recipes } = useSelector((state: RootState) => state.recipe);
  const isCreatePath = location.pathname;
  console.log("this is a location path", location.pathname);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    PaginationInfo: { hasNextPage, hasPrevPage },
  } = useSelector((state: RootState) => state.recipe);

  const HandlePreviousClick = () => {
    if (hasPrevPage) {
      setCurrentPage((page) => page - 1);
      dispatch(getRecipesbyPagination(currentPage));
    }
  };
  const HandleNextClick = () => {
    if (hasNextPage) {
      setCurrentPage((page) => page + 1);
      dispatch(getRecipesbyPagination(currentPage));
    }
  };

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
