import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetYourMeals } from "../../Redux-toolkit/Slices/MealSlice";
import { RootState } from "../../InterfaceTypes/RootstateInterface";

const GetMealplans: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();
  const {
    Pagination: { hasNextPage, hasPrevPage },
  } = useSelector((state: RootState) => state.meal);
  const { meals } = useSelector((state: RootState) => state.meal);

  useEffect(() => {
    dispatch(GetYourMeals(page));
  }, [page]);

  const handlePrevClick = () => {
    if (hasPrevPage) {
      setPage((prevpage) => prevpage - 1);
    }
  };
  const HandleNextClick = () => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <div className="flex flex-col bg-black min-h-screen items-center ">
      <h1 className="text-green-500 text-center font-bold text-2xl ">
        Your Meal Plans
      </h1>
      <div className="flex gap-5 flex-wrap">
        {meals.map((meal) => (
          <div className="card border-green-500 border-[0.5px] hover:border-red-500  w-96 shadow-xl bg-black rounded-sm mx-auto">
            <div className="card-body bg-black">
              {/* in this we need to do only the start date and date and in button clicks the user then we need to navigate on the next page after that the all the working of update and delete is perform in the navigated page
               */}
              <div className="flex flex-row w-full justify-between">
                <div className=" font-bold text-pink-500">
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

                <div className=" font-bold text-pink-500">
                  {new Date(meal.endDate).toDateString()}
                </div>
              </div>
              <div className="card-actions justify-end">
                <button
                  type="button"
                  className="bg-black text-green-500 border-[0.5px] border-green-500 hover:border-red-500 hover:text-red-500 hover:bg-black btn join-item"
                >
                  More Detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="join">
        <button
          type="button"
          onClick={handlePrevClick}
          className="join-item btn bg-black text-green-500 hover:bg-black hover:border-red-500 border-[0.5px] border-green-500"
        >
          «
        </button>
        <button
          type="button"
          className="join-item btn bg-black text-green-500 hover:bg-black hover:border-red-500 border-[0.5px] border-green-500"
        >
          Page {page}
        </button>
        <button
          type="button"
          onClick={HandleNextClick}
          className="join-item btn bg-black text-green-500 hover:bg-black hover:border-red-500 border-[0.5px] border-green-500"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default GetMealplans;
