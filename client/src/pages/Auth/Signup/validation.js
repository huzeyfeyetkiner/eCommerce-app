import { object, string, number, date, InferType, ref } from "yup";

let validations = object({
  email: string()
    .email("Geçerli bir email girin")
    .required("Bu alan zorunludur"),
  password: string()
    .min(5, "Parolanız en az 5 karakter içermelidir.")
    .required("Bu alan zorunludur"),
  passwordConfirm: string()
    .oneOf([ref("password")], "Giriğiniz paralolar eşleşmiyor")
    .required("bu alan zorunludur"),
});

export default validations;
