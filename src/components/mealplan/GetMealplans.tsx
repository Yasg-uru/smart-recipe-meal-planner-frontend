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
      <div className="flex gap-2 flex-wrap"></div>
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
