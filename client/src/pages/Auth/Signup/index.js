import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import validationSchema from "./validation";
import { fetchRegister } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate(); // kayıt işlemi sonrası ana sayfaya yönlendirmek için

  // formik ve yup ile beraber validasyon submit ve form işlemlerini gerçekleştirdim
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    onSubmit: async (values, bag) => {
      try {
        // kayıt işlemi için formdan gelen verileri veritabanına gönderiyoruz.
        const registerResponse = await fetchRegister({
          email: values.email,
          password: values.password,
        });
        console.log(registerResponse);

        login(registerResponse); // authContext içerisinde yazılmış olan login fonksiyonu ile beraber veritabanına gönderilen verilerle login işlemini gerçekleştiriyoruz

        navigate("/profile"); // submit işlemi sonrası anasayfaya yönlendirme
      } catch (e) {
        bag.setErrors({ general: e.response.data.message }); // hata mesajını alıyoruz
      }
    },
    validationSchema, //yup'dan export edilen validasyon kriterleri
  });

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt="10px" w="40%">
          <Box textAlign="center">
            <Heading>Sign Up</Heading>
          </Box>

          {/* olası bir hata durumunda kullanıcıya hata mesajı gösteriliyor */}
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>

          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>

                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="error">{formik.errors.email}</p>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="error">{formik.errors.password}</p>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password Confirm</FormLabel>
                <Input
                  name="passwordConfirm"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  isInvalid={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                />
                {formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm && (
                    <p className="error">{formik.errors.passwordConfirm}</p>
                  )}
              </FormControl>

              <Button mt={4} width="full" type="submit">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}
export default Signup;
