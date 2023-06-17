import { useRef, useState } from "react";
import { postOrder } from "../../api";
import {
  Alert,
  Image,
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import { Link } from "react-router-dom";

function Basket() {
  // modal içerisinde gelen adres değerini tutmak için
  const [address, setAddress] = useState("");

  const { items, removeFromBasket, emptyBasket } = useBasket();

  // modal için gerekli fonksiyonlar (açma kapama)
  const { isOpen, onOpen, onClose } = useDisclosure();

  // modal açıldığında odaklanılmasını istediğimiz inputu belirlemek için
  const initialRef = useRef(null);

  // reduce ile beraber sepetteki ürünlerin total fiyatını alınıyor.
  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item._id);

    const input = {
      address,
      items: JSON.stringify(itemIds),
    };

    await postOrder(input);

    emptyBasket();
  };

  if (items.length < 1) {
    return <Alert status="warning">You have no items in your basket!</Alert>;
  }
  return (
    <Box className="basket" padding="10">
      {
        <>
          <ul className="basket-list">
            {items.map((item) => {
              return (
                <li key={item._id} className="basket-item">
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
          </ul>

          <hr />
          <Box mt="10">
            <Text fontSize="22">Total: {total}</Text>
          </Box>

          <Button mt="2" size="sm" colorScheme="green" onClick={onOpen}>
            Order
          </Button>

          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create your account</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      }
    </Box>
  );
}
export default Basket;
