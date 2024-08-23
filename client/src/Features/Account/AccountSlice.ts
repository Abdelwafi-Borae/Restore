import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../App/Models/User";
import { FieldValues } from "react-hook-form";
import agent from "../../App/API/agent";
import { json, Navigate, useNavigate } from "react-router";
import { History } from "@mui/icons-material";
import { push, routerMiddleware } from "react-router-redux";
import { browserHistory } from "../../App/Layout/App";
import { Action } from "history";
import { toast } from "react-toastify";
import { setbasket } from "../Basket/Bsketslice";

interface acccountstate {
  user: User | null;
}
export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.Account.login(data);
      const { basket, ...user } = userDto;
      console.log(userDto);

      if (basket) thunkAPI.dispatch(setbasket(basket));
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      thunkAPI.rejectWithValue({ error: error });
      //   console.log(error);
    }
  }
);
export const fetchcurrentuser = createAsyncThunk<User>(
  "account/fetchcurrentuser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setuser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const userDto = await agent.Account.currrentuser();
      const { basket, ...user } = userDto;
      if (basket) thunkAPI.dispatch(setbasket(basket));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      console.log("erorrd");

      thunkAPI.rejectWithValue({ error: error });
      //   console.log(error);
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);
const initialState: acccountstate = { user: null };
export const accountslice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setuser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchcurrentuser.rejected, (state) => {
      console.log("reject@@@@@@");
      state.user = null;
      localStorage.removeItem("user");
      toast.error("session expired");

      browserHistory.push("/");
    });
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchcurrentuser.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { signout, setuser } = accountslice.actions;
