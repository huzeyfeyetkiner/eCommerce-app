import { Alert, Image, Button, Box, Text } from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import { Link } from "react-router-dom";

function Basket() {
  const { items, removeFromBasket } = useBasket();

  // reduce ile beraber sepetteki ürünlerin total fiyatını alınıyor.
  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  if (items.length < 1) {
    return <Alert status="warning">You have no items in your basket!</Alert>;
  }
  return (
    <Box padding="10">
      {
        <>
          <ul>
            {items.map((item) => {
              return (
                <li key={item._id} style={{ marginBottom: "20px" }}>
                  <Link to={`/product/${item._id}`}>
                    {item.title} - {item.price} TL
                    <Image
                      htmlWidth={200}
                      loading="lazy"
                      src={item.photos[0]}
                      alt="prdct photo"
                    />
                  </Link>

                  <Button
                    mt="2"
                    size="sm"
                    colorScheme="pink"
                    onClick={() => {
                      removeFromBasket(item._id);
                    }}
                  >
                    Remove from basket
                  </Button>
                </li>
              );
            })}
            <Box mt="10">
              <Text fontSize="22">Total:{total}</Text>
            </Box>
          </ul>
        </>
      }
    </Box>
  );
}
export default Basket;
