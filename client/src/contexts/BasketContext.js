import { useState, createContext, useContext, useEffect } from "react";

const BasketContext = createContext();

const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];

export const BasketProvider = ({ children }) => {
  const [items, setItems] = useState(defaultBasket);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(items));
  }, [items]);

  //parametre olarak eklenmek istenen veriyi içeren data parametresini istiyoruz, findBasketItem ile beraber eklenmek istenen itemin sepette olup olmadığını kontrol ederek işlemler gerçekleştirebiliyoruz.
  const addToBasket = (data, findBasketItem) => {
    if (!findBasketItem) {
      setItems((prev) => [...prev, data]);
    } else {
      const filtered = items.filter((item) => item._id !== findBasketItem._id);
      setItems(filtered);
    }
  };

  const removeFromBasket = (itemId) => {
    const filtered = items.filter((item) => item._id !== itemId);
    setItems(filtered);
  };

  const values = {
    items,
    setItems,
    addToBasket,
    removeFromBasket,
  };

  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};
export default BasketContext;

export const useBasket = () => useContext(BasketContext);
