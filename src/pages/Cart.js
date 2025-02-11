import { Box, Center, Divider, Flex, HStack, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { BsArrowLeft } from "react-icons/bs";
import CartItems from "../components/CartItems";
import EmptyCart from "../components/EmptyCart";
import { Link } from "react-router-dom";

export default function Cart() {
  const [items, setItems] = useState([]);
  const reload = () => window.location.reload();
  const [price, setPrice] = useState("loading...");

  useEffect(() => {
    const fetched_items = JSON.parse(localStorage.getItem("@cart_items")) || [];
    setItems(fetched_items);
    let total = 0;
    fetched_items.forEach((obj) => {
      total += parseInt(obj.price, 10);
    });
    setPrice(total);
  }, [setItems]); 

  const groupCartItems = (items) => {
    const groupedItems = items.reduce((acc, item) => {
      const existingCartItem = acc.find((i) => i.img === item.img);
      if (existingCartItem) {
        existingCartItem.qty += 1;
      } else {
        acc.push({ ...item, qty: 1 });
      }
      return acc;
    }, []);
    return groupedItems;
  };

  const cartItems = groupCartItems(items);
 
  return (
    <>
      {items === null || items.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <Link to="/">
            <Flex
              color="red"
              mt="1rem"
              pl={{ lg: "20rem", sm: "6rem", md: "12rem" }}
              fontSize={{ sm: "1rem", md: "1.2rem" }}
            >
              {<BsArrowLeft color="#E5383B" fontSize="1.6rem" mr="1rem" />}
              Continue Shoping
            </Flex>
          </Link>
          <Center mt="0.2rem">
            <HStack w="46rem">
              <Box fontSize={{ md: "1.6rem", sm: "1.2rem" }}>Shoping Cart</Box>
              <Spacer />
              <Box
                fontSize={{ md: "1.6rem", sm: "1.2rem" }}
                display={{ sm: "none", md: "block", lg: "block", xl: "block" }}
              >
                items
              </Box>
            </HStack>
          </Center>
          <Center>
            <Divider w="46rem" color="gray" />
          </Center>
          <Box display={{ sm: "none", md: "block", lg: "block", xl: "block" }}>
            <Center mt="2.5rem">
              <HStack w={{ sm: "40rem", md: "46rem" }}>
                <Box
                  color="lblack"
                  fontSize={{ sm: "0.6rem", md: "0.8rem" }}
                  style={{ letterSpacing: "0.1rem" }}
                >
                  PRODUCT DETAILS
                </Box>
                <Spacer />
                <Box
                  color="lblack"
                  fontSize={{ sm: "0.6rem", md: "0.8rem" }}
                  style={{ letterSpacing: "0.1rem" }}
                >
                  QUANTITY
                </Box>
                <Spacer />
                <Box
                  color="lblack"
                  fontSize={{ sm: "0.6rem", md: "0.8rem" }}
                  style={{ letterSpacing: "0.1rem" }}
                >
                  PRICE
                </Box>
                <Spacer />
                <Box
                  color="lblack"
                  fontSize={{ sm: "0.6rem", md: "0.8rem" }}
                  style={{ letterSpacing: "0.1rem" }}
                >
                  TOTAL
                </Box>
              </HStack>
            </Center>
          </Box>
          {cartItems.map((item, i) => (
            <Center key={i}>
              <Box w="46rem" mt="2rem">
                <CartItems
                  img={item.img}
                  price={item.price}
                  key={item.id}
                  qty={item.qty}
                  item={item}
                  setItems={setItems}
                  reload={reload}
                />
              </Box>
            </Center>
          ))}
          <Box
            display={{ sm: "none", md: "block", lg: "block", xl: "block" }}
            mb="2rem"
          >
            <Link to="/checkout">
              <Center mt="2rem">
                <HStack spacing={60}>
                  <Box fontSize="1rem">TOTAL:- ${price}</Box>
                  <Spacer />
                  <Box
                    w="6.5rem"
                    h="1.5rem"
                    as="button"
                    color="white"
                    bg="red"
                    style={{ borderRadius: "0.2rem" }}
                  >
                    continue
                  </Box>
                </HStack>
              </Center>
            </Link>
          </Box>
          <Box
            display={{ sm: "block", md: "none", lg: "none", xl: "none" }}
            mb="2rem"
          >
            <Link to="/checkout">
              <Center
                mt="2rem"
                display={{ sm: "block", md: "none", lg: "none", xl: "none" }}
              >
                <HStack spacing={14}>
                  <Box fontSize="1rem">TOTAL:- ${price}</Box>
                  <Spacer />
                  <Box
                    w="6.5rem"
                    h="1.5rem"
                    as="button"
                    color="white"
                    bg="red"
                    style={{ borderRadius: "0.2rem" }}
                  >
                    continue
                  </Box>
                </HStack>
              </Center>
            </Link>
          </Box>
        </>
      )}
    </>
  );
}
