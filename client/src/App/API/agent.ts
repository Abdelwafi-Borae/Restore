import { Details } from "@mui/icons-material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));
axios.defaults.baseURL = "https://localhost:7031/api/";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: any) => {
    console.log("caught by interseptor");
    console.log(error);

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
          throw modeststeerror.flat();
        }
        toast.error(data?.title);
        break;
      case 401:
        toast.error(data?.title);
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
    return Promise.reject(error.response?.data);
  }
);
const responsebody = (response: AxiosResponse) => response.data;
const request = {
  get: (url: string) => axios.get(url).then(responsebody),
  post: (url: string, body: {}) =>
    axios
      .post(
        url,
        body
        //,{
        //   headers: { "Content-Type": "application/json" },
        //   withCredentials: true,
        // }
      )
      .then(responsebody),
  put: (url: string, body: {}) => axios.get(url, body).then(responsebody),
  delete: (url: string) => axios.delete(url).then(responsebody),
};
const catalog = {
  list: request.get("product"),
  details: (id: number) => request.get(`product/${id}`),
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
const agent = { catalog, testerrors, Basket };
export default agent;
