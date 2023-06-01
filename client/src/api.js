// API'lerle ilgili işlemlerin gerçekleşeceği dosya

import axios from "axios";
export const fetchProductList = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_END_POINT}/product`
  );

  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_END_POINT}/product/${id}`
  );

  return data;
};
