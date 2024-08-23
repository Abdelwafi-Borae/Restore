import * as yup from "yup";
export const Validationscema = [
  yup.object({
    fullName: yup.string().required("full name is required"),
    address1: yup.string().required(),
    address2: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    country: yup.string().required(),
  }),
  yup.object(),
  yup.object({
    nameOnCard: yup.string().required("full name is required"),
  }),
];
