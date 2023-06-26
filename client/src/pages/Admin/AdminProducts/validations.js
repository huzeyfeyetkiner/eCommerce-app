import { object, string } from "yup";

let editSchema = object({
  title: string().required(),
  description: string().min(5).required(),
  price: string().required(),
});

export default editSchema;
