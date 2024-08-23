import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Basket } from "../../App/Models/Basket";
import agent from "../../App/API/agent";
import { getCookie } from "../../App/util/util";

interface basketstate {
  basket: Basket | null;
  status: string;
}
const initialState: basketstate = { basket: null, status: "idle" };
export const addbasketitemasync = createAsyncThunk<
  Basket,
  { productid: number; quantity?: number }
>(
  "basket/addbasketitemasync",
  async ({ productid, quantity = 1 }, thunkAPI) => {
    try {
      return await agent.Basket.AddItem(productid, quantity);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
export const removebasketitemasync = createAsyncThunk<
  void,
  { productid: number; quantity: number; name?: string }
>("basket/removebasketitemasync", async ({ productid, quantity }, thunkAPI) => {
  try {
    await agent.Basket.RemoveItem(productid, quantity);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});
export const fetchbasket = createAsyncThunk<Basket>(
  "basket/fetchbasket",
  async (_, thunkAPI) => {
    try {
      return await agent.Basket.get();
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.error);
    }
  },
  {
    condition: () => {
      if (!getCookie("buyerId")) return false;
    },
  }
);
export const basketslice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setbasket: (state, action) => {
      state.basket = action.payload;
    },
    clearbasket: (state) => {
      state.basket = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addbasketitemasync.pending, (state, action) => {
      state.status = "pendingadditem" + action.meta.arg.productid;
      console.log("pendingadditem" + action.meta.arg.productid);
    });

    builder.addCase(removebasketitemasync.pending, (state, action) => {
      state.status =
        "pendingremoveitem" + action.meta.arg.productid + action.meta.arg.name;
    });
    builder.addCase(removebasketitemasync.fulfilled, (state, action) => {
      const { productid, quantity } = action.meta.arg;

      console.log(quantity);
      console.log(productid);
      productid;
      console.log(action);

      const itemindex = state.basket?.items.findIndex(
        (item) => item.productId === productid
      );
      if (itemindex === -1 || itemindex === undefined) return;
      state.basket!.items[itemindex].quantity -= quantity;
      if (state.basket?.items[itemindex].quantity === 0)
        state.basket?.items.splice(itemindex, 1);
      state.status = "idle";
    });
    builder.addCase(removebasketitemasync.rejected, (state) => {
      state.status = "idle";
    });
    builder.addMatcher(
      isAnyOf(addbasketitemasync.fulfilled, fetchbasket.fulfilled),
      (state, action) => {
        state.basket = action.payload;
        state.status = "idle";
      }
    );
    builder.addMatcher(
      isAnyOf(addbasketitemasync.fulfilled, fetchbasket.fulfilled),
      (state) => {
        state.status = "idle";
      }
    );
  },
});
export const { setbasket, clearbasket } = basketslice.actions;
