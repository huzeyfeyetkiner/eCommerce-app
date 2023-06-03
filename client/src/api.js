// API'lerle ilgili işlemlerin gerçekleşeceği dosya

import axios from "axios";
export const fetchProductList = async ({ pageParam = 0 }) => {
  // products sayfası için gerçekleştirilicek api isteği
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_END_POINT}/product?page=${pageParam}`
  );

  return data;
};

// ürün detay sayfası için gerçekleştirilecek api isteği
export const fetchProduct = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_END_POINT}/product/${id}`
  );

  return data;
};

// kayıt işleminin gerçekleştiği api isteği
export const fetchRegister = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_END_POINT}/auth/register`,
    input
  );

  return data;
};
