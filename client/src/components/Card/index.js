import { Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";

import { useBasket } from "../../contexts/BasketContext";

function Card({ item }) {
  const { addToBasket, items } = useBasket();

  // sepete eklenmek istenen ürünün hali hazırda spette olup olmadığını kontrol ediyoruz.
  const findBasketItem = items.find(
    (basketItem) => basketItem._id === item._id
  );

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
      <Link to={`product/${item._id}`}>
        <Image src={item.photos[0]} alt="product" loading="lazy" />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {moment(item.createdAt).format("DD/MM/YYYY")}
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {item.title}
          </Box>
          <Box>{item.price} TL</Box>
        </Box>
      </Link>

      <Button
        variant="solid"
        colorScheme={findBasketItem ? "pink" : "green"}
        onClick={() => addToBasket(item, findBasketItem)}
      >
        {findBasketItem ? "Remove From Basket" : "Add to Basket"}
      </Button>
    </Box>
  );
}
export default Card;
