import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../../api";
import { useParams } from "react-router-dom";
import { Box, Text, Button } from "@chakra-ui/react";
import moment from "moment"; // tarih verilerini formatlamak için kullanıyorum.
import ImageGallery from "react-image-gallery";
import { useBasket } from "../../contexts/BasketContext";

function ProductDetail() {
  // tıklanan ürüne ait id değerini tutmak için.
  const { product_id } = useParams();

  const { addToBasket, items } = useBasket();

  // tıklanan ürünün detaylarını göstermek için kullanılan query
  const { isLoading, error, data } = useQuery({
    queryKey: ["product", product_id],
    queryFn: () => {
      return fetchProduct(product_id);
    },
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const images = data.photos.map((url) => ({ original: url }));

  // sepete eklenmek istenen ürünün hali hazırda spette olup olmadığını kontrol ediyoruz.
  const findBasketItem = items.find((item) => item._id === product_id);

  return (
    <div>
      <Button
        colorScheme={findBasketItem ? "pink" : "green"}
        onClick={() => addToBasket(data, findBasketItem)}
      >
        {findBasketItem ? "Remove From Basket" : "Add to Basket"}
      </Button>

      <Text as="h2" fontSize="2xl">
        {data.title}
      </Text>

      <Text as="h2" fontSize="2xl">
        {moment(data.createdAt).format("DD/MM/YYYY")}
      </Text>

      <p>{data.description}</p>

      <Box m="10px">
        <ImageGallery
          items={images}
          showPlayButton={false}
          autoPlay={true}
          showFullscreenButton={false}
        ></ImageGallery>
      </Box>
    </div>
  );
}
export default ProductDetail;
