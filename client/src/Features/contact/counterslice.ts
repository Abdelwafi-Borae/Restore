import { createSlice } from "@reduxjs/toolkit";

export interface counterstate {
  data: number;
  title: string;
}
const initialstate: counterstate = {
  data: 42,
  title: "another redux counter with redux tool kits",
};
export const counterslice = createSlice({
  name: "counterr",
  initialState: initialstate,
  reducers: {
    increment: (state, action) => {
      state.data += action.payload;
    },
    decrement: (state, action) => {
      state.data -= action.payload;
    },
  },
});
export const { increment, decrement } = counterslice.actions;
