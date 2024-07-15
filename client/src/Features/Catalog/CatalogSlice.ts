import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { product } from "../../App/Models/product";
import agent from "../../App/API/agent";
import { rootstate } from "../../App/store/configureStore";

const productadapter = createEntityAdapter<product>();
export const fetchproductsasync = createAsyncThunk<product[]>(
  "cataloge/fetchproductsasync",
  async () => {
    try {
      return await agent.catalog.list;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchproductasync = createAsyncThunk<product, number>(
  "cataloge/fetchproductasync",
  async (productId, thunkAPI) => {
    try {
      return await agent.catalog.details(productId);
    } catch (error: any) {
      //console.log(error);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
export const catalogslice = createSlice({
  name: "catalog",
  initialState: productadapter.getInitialState({
    productloaded: false,
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchproductsasync.pending, (state) => {
      state.status = "pendingfetchproducts";
    });
    builder.addCase(fetchproductsasync.fulfilled, (state, action) => {
      productadapter.setAll(state, action.payload);
      state.status = "idle";
      state.productloaded = true;
    });
    builder.addCase(fetchproductsasync.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(fetchproductasync.pending, (state) => {
      state.status = "pendingfetchproduct";
    });
    builder.addCase(fetchproductasync.fulfilled, (state, action) => {
      productadapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchproductasync.rejected, (state, action) => {
      console.log(action);

      state.status = "idle";
    });
  },
});
export const productselector = productadapter.getSelectors(
  (state: rootstate) => state.catalog
);
