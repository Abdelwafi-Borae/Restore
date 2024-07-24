import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { product, ProductParams } from "../../App/Models/product";
import agent from "../../App/API/agent";
import { rootstate } from "../../App/store/configureStore";
import { Root } from "react-dom/client";
import { RootState } from "@reduxjs/toolkit/query";
import { MetaData } from "../../App/Models/Pagination";
interface catalogstate {
  productloaded: boolean;
  filtersloaded: boolean;
  status: string;
  brands: string[];
  Types: string[];
  productparams: ProductParams;
  metadata: MetaData | null;
}
const productadapter = createEntityAdapter<product>();
function getAxiosParams(ProductParams: ProductParams) {
  const Params = new URLSearchParams();
  Params.append("OrederBy", ProductParams.OrederBy);
  Params.append("PageNumber", ProductParams.PageNumber.toString());
  Params.append("PageSize", ProductParams.PageSize.toString());
  if (ProductParams.Searchterm)
    Params.append("Searchterm", ProductParams.Searchterm);
  if (ProductParams.Types.length > 0)
    Params.append("Types", ProductParams.Types.toString());
  if (ProductParams.Brands.length > 0)
    Params.append("Brands", ProductParams.Brands.toString());
  return Params;
}
export const fetchproductsasync = createAsyncThunk<
  product[],
  void,
  { state: rootstate }
>("cataloge/fetchproductsasync", async (_, thunkAPI) => {
  const param = getAxiosParams(thunkAPI.getState().catalog.productparams);
  try {
    const response = await agent.catalog.list(param);
    thunkAPI.dispatch(setmetadata(response.metaData));
    return response.items;
  } catch (error) {
    // console.log(error);
  }
});
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
export const FetchFilter = createAsyncThunk(
  "cataloge/fetchfilter",
  async (_, thunkAPI) => {
    try {
      const rs = await agent.catalog.filter();

      return rs;
    } catch (error: any) {
      console.log("filter catch");
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
function initprams() {
  return {
    PageNumber: 1,
    PageSize: 6,
    OrederBy: "name",
    Brands: [],
    Types: [],
  };
}
export const catalogslice = createSlice({
  name: "catalog",
  initialState: productadapter.getInitialState<catalogstate>({
    productloaded: false,
    filtersloaded: false,
    status: "idle",
    brands: [],
    Types: [],
    productparams: initprams(),
    metadata: null,
  }),
  reducers: {
    setproductprams: (state, action) => {
      state.productloaded = false;
      state.productparams = {
        ...state.productparams,
        ...action.payload,
        PageNumber: 1,
      };
    },
    setpagenumber: (state, action) => {
      state.productloaded = false;
      state.productparams = { ...state.productparams, ...action.payload };
    },
    resetproductprams: (state) => {
      state.productparams = initprams();
    },
    setmetadata: (state, action) => {
      state.metadata = action.payload;
    },
  },
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
    builder.addCase(FetchFilter.pending, (state) => {
      state.status = "pendingFetchFilter";
    });
    builder.addCase(FetchFilter.fulfilled, (state, action) => {
      //console.log(action);

      state.Types = action.payload.types;
      state.brands = action.payload.brands;
      state.filtersloaded = true;
      state.status = "idle";
    });
    builder.addCase(FetchFilter.rejected, (state, action) => {
      state.status = "idle";
    });
  },
});
export const productselector = productadapter.getSelectors(
  (state: rootstate) => state.catalog
);
export const {
  setproductprams,
  resetproductprams,
  setmetadata,
  setpagenumber,
} = catalogslice.actions;
