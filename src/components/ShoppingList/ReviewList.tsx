import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../InterfaceTypes/RootstateInterface";
import { useLocation } from "react-router-dom";
import { shoppingList } from "../../InterfaceTypes/shoppingList/createShoppingList";
import { UpdateListStatus } from "../../Redux-toolkit/Slices/shoppingSlice";

const ReviewList: React.FC = () => {
  const { Lists } = useSelector((state: RootState) => state.shopping);
  const location = useLocation();
  const dispatch = useDispatch();

  const [List, setList] = useState<shoppingList>();

  useEffect(() => {
    if (Lists.length > 0 && location.state?.Id) {
      const FilteredList = Lists.find(
        (list) => list._id.toString() === location.state.Id.toString()
      );
      setList(FilteredList);
      console.log("this is a filtered data :", FilteredList);
    }
  }, [Lists, location.state]);

  //in this component we need to render the entire list and do options of update and review
  const handleChangeBox = (index: number) => {
    if (List) {
      // Create a deep copy of the List object
      const UpdatedList = { ...List, items: [...List.items] };
      UpdatedList.items[index] = {
        ...UpdatedList.items[index],
        isChecked: !UpdatedList.items[index].isChecked,
      };
      setList(UpdatedList);
      console.log("this is the list:", UpdatedList);
    }
  };
  function handlesaveList(): void {
    dispatch(UpdateListStatus(List));
  }

  return (
    <div className="bg-black min-h-screen">
      <h1 className=" font-bold text-green-500 text-center text-2xl">
        Review List & Update
      </h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-pink-500 text-2xl font-bold ">
              <th>Name</th>
              <th>Quantity</th>
              <th>isChecked</th>
            </tr>
          </thead>
          <tbody>
            {List?.items.map((list, index) => (
              <tr key={index} className="text-green-500 ">
                <th>{list.name}</th>
                <td>{list.quantity}</td>
                <td>
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        checked={list.isChecked}
                        onChange={() => handleChangeBox(index)}
                        className="checkbox checkbox-accent"
                        value={list.isChecked.toString()}
                      />
                    </label>
                  </div>
                </td>
              </tr>
            ))}
            <button
              onClick={handlesaveList}
              type="button"
              className="btn mt-2 text-green-500 bg-black hover:bg-black hover:text-red-500 border-[0.5px] hover:border-red-500"
            >
              Save List
            </button>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewList;
