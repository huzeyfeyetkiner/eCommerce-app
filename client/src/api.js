// API'lerle ilgili işlemlerin gerçekleşeceği dosya

import axios from "axios";

// axiosla beraber gelen bu özellik sayesinde endpointe istek atılmadan önce işlem yapabiliyoruz.
axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);

    const allowedOrigins = [process.env.REACT_APP_BASE_END_POINT];
    const token = localStorage.getItem("access-token");

    if (allowedOrigins.includes(origin)) {
      config.headers.Authorization = token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

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

// hesap giriş işlemi için
export const fetchLogin = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_END_POINT}/auth/login`,
    input
  );

  return data;
};

// kayıt işlemi sonrası profil bilgilerini aktarmak için kullanılacak istek
export const fetchMe = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_END_POINT}/auth/me`
  );

  return data;
};

// hesap çıkış işlemi için
export const fetchLogout = async () => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_END_POINT}/auth/logout`,
    {
      refresh_token: localStorage.getItem("refresh-token"),
    }
  );

  return data;
};

export const postOrder = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_END_POINT}/order`,
    input
  );

  return data;
};
