import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterFormInterface } from "../../InterfaceTypes/Auth/RegisterType";
import axios, { Axios, AxiosError } from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosinstance";
export interface AuthState {
  email: string;
  name: string;
  isAuthenticated: boolean;
}
export interface Response {
  user: {
    Name: string;
    Email: string;
  };
}
const initialState: AuthState = {
  email: "",
  name: "",
  isAuthenticated:
    localStorage.getItem("isAuthenticated") === "true" ? true : false,
};
export interface ApiResponse {
  user: {
    Name: string;
    Email: string;
  };
}

export const signup: any = createAsyncThunk("/signup", async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/user/register",
      formData,
      {
        withCredentials: true,
      }
    );
    toast.success("successfully created your account");

    return response.data;
  } catch (error) {
    console.log("this is a error :", error);
    const axiosError = error as AxiosError;

    // toast.error(axiosError?.response?.data.message);

    // throw error;
  }
});
export const Logincomponent:any = createAsyncThunk("/login", async (formdata) => {
  try {
    const response = await axiosInstance.post(`/user/login`, formdata, {
      withCredentials: true,
    });
    toast.success("successfully loggedin")
    return response.data;
  } catch (error) {
    toast.error("failed to login");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signup.fulfilled, (state, action) => {
      if (action.payload) {
        state.email = action.payload.user.Email;
        state.name = action.payload.user.Name;
        state.isAuthenticated = true;
        localStorage.setItem("isAuthenticated", "true");
      }
    });
    builder.addCase(Logincomponent.fulfilled, (state, action) => {
      state.email = action.payload.user.Email;
      state.name = action.payload.user.Name;
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", "true");
    });
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;
