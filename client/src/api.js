// API'lerle ilgili işlemlerin gerçekleşeceği dosya

import axios from "axios";
export const fetchProductList = async ({ pageParam = 0 }) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_END_POINT}/product?page=${pageParam}`
  );

  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_END_POINT}/product/${id}`
  );

  return data;
};
