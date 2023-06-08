import { object, string } from "yup";

let validations = object({
  email: string()
    .email("Geçerli bir email girin")
    .required("Bu alan zorunludur"),
  password: string()
    .min(5, "Parolanız en az 5 karakter içermelidir.")
    .required("Bu alan zorunludur"),
});

export default validations;
