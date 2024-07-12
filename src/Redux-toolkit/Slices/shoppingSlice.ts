import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosinstance";
import toast from "react-hot-toast";
import {
  shoppingList,
  ShoppingListState,
} from "../../InterfaceTypes/shoppingList/createShoppingList";

const LoadList = (): shoppingList[] => {
  const savedData = sessionStorage.getItem("list");
  // return savedData ? JSON.parse(savedData) : [];
  if (!savedData) {
    return [];
  }
  return JSON.parse(savedData);
};
const saveLists = (data: shoppingList[]) => {
  sessionStorage.setItem("list", JSON.stringify(data));
};
const initialState: ShoppingListState = {
  Lists: LoadList(),
  Pagination: {
    hasNextPage: false,
    hasPreviousPage: false,
  },
};
export const UpdateListStatus: any = createAsyncThunk(
  "/shopping/update",
  async (formdata: shoppingList) => {
    try {
      console.log("this is formdata ", formdata);

      const response = await axiosInstance.put(
        `/shopping/update?shoppingId=${formdata._id}`,
        formdata,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("error in update shopping List");
      toast.error("failed to update list ");
    }
  }
);
export const DeleteList: any = createAsyncThunk(
  "/shopping/delete",
  async (id) => {
    try {
      const response = await axiosInstance.delete(`/shopping/delete?id=${id}`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.log("error in delete shopping List");
      toast.error("failed to delete list ");
    }
  }
);
export const GenerateShoppinList: any = createAsyncThunk(
  "/shopping/generate",
  async (formData) => {
    try {
      const response = await axiosInstance.post(
        "/shopping/create",
        {
          items: formData,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error in generating shoppinglist");
    }
  }
);
export const SearchByQuery: any = createAsyncThunk(
  "/shopping/search",
  async (query) => {
    try {
      // console.log("this is a formdata:", formData);

      const response = await axiosInstance.get(
        `/shopping/bysearchbar?searchterm=${query}`,

        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      toast.error("failed to search");

      throw new Error("Error in generating shoppinglist");
    }
  }
);
export const getListByPagination: any = createAsyncThunk(
  "/shoppinglist/pagination",
  async (pagenumber) => {
    try {
      const response = await axiosInstance.get(
        `/shopping/bypagination?currentpage=${pagenumber}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("erorr in get shopping list by pagination ");
      toast.error("failed to get shoppinglist ");
    }
  }
);
const ShoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getListByPagination.fulfilled, (state, action) => {
      state.Lists = action.payload?.result;
      saveLists(state.Lists);

      state.Pagination.hasNextPage = action.payload.hasNextPage;
      state.Pagination.hasPreviousPage = action.payload.hasPreviousPage;
    });
    builder.addCase(UpdateListStatus.fulfilled, (state, action) => {
      const updatedListObject = action.payload.UpdatedshoppingList;
      const index = state.Lists.findIndex(
        (list) => list._id.toString() === updatedListObject._id.toString()
      );
      if (index !== -1) {
        state.Lists[index] = updatedListObject;
        saveLists(state.Lists);
      }
    });
    builder.addCase(DeleteList.fulfilled, (state, action) => {
      const deletedList = action.payload.deletedlist;
      const index = state.Lists.findIndex(
        (list) => list._id.toString() === deletedList._id.toString()
      );
      if (index !== -1) {
        state.Lists.splice(index, 1);
        saveLists(state.Lists);
      }
    });
    builder.addCase(SearchByQuery.fulfilled, (state, action) => {
      state.Lists = action.payload.searchresult;
      saveLists(state.Lists);
    });
  },
});
export default ShoppingSlice.reducer;
export const {} = ShoppingSlice.actions;
