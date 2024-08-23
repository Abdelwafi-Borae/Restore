import { Details } from "@mui/icons-material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { PaginatedResponse } from "../Models/Pagination";
import { store } from "../store/configureStore";
import { push } from "react-router-redux";
const sleep = () => new Promise((resolve) => setTimeout(resolve, 0));
axios.defaults.baseURL = "https://localhost:7031/api/";
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  const token = store.getState().Account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
axios.interceptors.response.use(
  async (response) => {
    await sleep();
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
    }
    return response;
  },
  (error: any) => {
    console.log("caught by interseptor");
    console.log(error.response.data.errors);
    // console.log(error.response.status);

    const { status, data } = error.response!;
    switch (status) {
      case 400:
        if (data.errors) {
          const modeststeerror: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modeststeerror.push(data.errors[key]);
            }
          }
          //return modeststeerror.flat;

          throw modeststeerror.flat();
        }
        toast.error(data?.title);
        break;
      case 401:
        {
          toast.error(data?.title || "unotheried");
        }
        break;
      // case 404:
      //   toast.error(data?.title);
      //   break;
      case 500:
        toast.error(data?.title);
        break;
      default:
        break;
    }
    console.log("error inside inspector");
    console.log(error.response.data.errors);

    //return error;
    //return Promise.reject(error.response?.data.errors);
    return Promise.reject(error.response?.data);
  }
);
const responsebody = (response: AxiosResponse) => response.data;
const request = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responsebody),
  post: (url: string, body: {}) => axios.post(url, body).then(responsebody),
  put: (url: string, body: {}) => axios.get(url, body).then(responsebody),
  delete: (url: string) => axios.delete(url).then(responsebody),
};
const catalog = {
  list: (params: URLSearchParams) => request.get("product", params),
  details: (id: number) => request.get(`product/${id}`),
  filter: () => request.get("product/Filters"),
};
const testerrors = {
  get400error: () => request.get("Buggy/BadRequest"),
  get401error: () => request.get("Buggy/getunauthenticated"),
  get404error: () => request.get("Buggy/getnotfound"),
  get500error: () => request.get("Buggy/getservererror"),
  getvalidationerror: () => request.get("Buggy/Getvalidationerror"),
};
const Basket = {
  get: () => request.get("Basket"),
  AddItem: (ProductId: number, Quantity = 1) =>
    //request.post(`Basket?ProductId={ProductId}&Quantity={Quantity}`, {}),
    request.post(`Basket?ProductId=${ProductId}&Quantity=${Quantity}`, {}),
  RemoveItem: (ProductId: number, Quantity = 1) =>
    request.delete(`Basket?ProductId=${ProductId}&Quantity=${Quantity}`),
};
const Account = {
  login: (value: any) => request.post("Account/Login", value),
  register: (value: any) => request.post("Account/Register", value),
  currrentuser: () => request.get("Account/Getcurrentuser"),
  getuseraddress: () => request.get("Account/savedaddress"),
};
const order = {
  createorder: (value: any) => request.post("Order", value),
  fetch: (Id: number) => request.get(`Order/${Id}`),
  list: () => request.get("Order"),
};
const agent = { catalog, testerrors, Basket, Account, order };
export default agent;
