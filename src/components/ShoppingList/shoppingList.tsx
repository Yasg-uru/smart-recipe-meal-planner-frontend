import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../InterfaceTypes/RootstateInterface";
import {
  DeleteList,
  getListByPagination,
  SearchByQuery,
} from "../../Redux-toolkit/Slices/shoppingSlice";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
const ShoppingList: React.FC = () => {
  const dispatch = useDispatch();
  const { Lists } = useSelector((state: RootState) => state.shopping);
  const [currentpage, setCurrentPage] = useState<number>(1);
  const {
    Pagination: { hasNextPage, hasPreviousPage },
  } = useSelector((state: RootState) => state.shopping);
  useEffect(() => {
    dispatch(getListByPagination(currentpage));
  }, [currentpage, Lists]);
  const navigate = useNavigate();
  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prevpage) => prevpage + 1);
    }
  };
  const handlePrevPage = () => {
    if (hasPreviousPage) {
      setCurrentPage((prevpage) => prevpage - 1);
    }
  };
  const HandleDelete = (id: string): void => {
    dispatch(DeleteList(id));
  };

  const HandleSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(SearchByQuery(query));
  };
  const [query, setQuery] = useState<string>("");
  const handlechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  return (
    <div className="bg-black min-h-screen flex flex-col gap-2 ">
      <form
        onSubmit={HandleSubmit}
        className="w-full flex gap-2 mx-auto justify-center my-2"
      >
        <input
          type="text"
          name="query"
          onChange={handlechange}
          placeholder="search "
          className="input input-bordered input-accent w-full max-w-xs bg-black text-white"
        />
        <button
          type="submit"
          className="btn btn-join text-green-500 bg-black hover:bg-black hover:text-red-500 border-[0.5px] hover:border-red-500   "
        >
          Search
        </button>
      </form>
      <div className="flex flex-wrap w-full p-3 gap-2 mx-auto">
        {Lists.length > 0 &&
          Lists.map((list) => (
            <div className="card  w-96 shadow-xl border-[0.5px] border-green-500 rounded-lg hover:border-red-500">
              <div className="card-body text-white">
                <div className="flex justify-between">
                  <h2 className="card-title">Smart Dosa</h2>
                  <MdDelete
                    onClick={() => HandleDelete(list._id)}
                    className="cursor-pointer"
                    size={30}
                    color="red"
                  />
                </div>
                <p>
                  Created At:{" "}
                  {new Date(list.createdAt.toString()).toDateString()}
                </p>
                <p>
                  Updated At:{" "}
                  {new Date(list.updatedAt.toString()).toDateString()}
                </p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() =>
                      navigate("/updateList", {
                        state: {
                          Id: list._id,
                        },
                      })
                    }
                    type="button"
                    className="btn btn-join text-green-500 bg-black hover:bg-black hover:text-red-500 border-[0.5px] hover:border-red-500   "
                  >
                    Check & Update Status
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="join mx-auto">
        <button
          onClick={handlePrevPage}
          type="button"
          className="join-item btn hover:text-red-500 hover:border-red-500 border-[0.5px] text-green-500 bg-black hover:bg-black "
        >
          «
        </button>
        <button
          type="button"
          className="join-item btn hover:text-red-500 hover:border-red-500 border-[0.5px] text-green-500 bg-black hover:bg-black "
        >
          Page {currentpage}
        </button>
        <button
          onClick={handleNextPage}
          type="button"
          className="join-item btn hover:text-red-500 hover:border-red-500 border-[0.5px] text-green-500 bg-black hover:bg-black "
        >
          »
        </button>
      </div>
    </div>
  );
};
export default ShoppingList;
