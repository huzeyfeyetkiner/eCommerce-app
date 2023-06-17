import React from "react";
import Card from "../../components/Card";
import { Box, Grid, Button, Flex } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProductList } from "../../api";

function Products() {
  // react-query ile beraber data fetch edebilmek için
  // react-query ile beraber tüm verileri tek seferde fetch etmek yerine kullanıcı istek gönderdiği taktirde yeni ürünleri fetch edebiliyoruz
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProductList,
    getNextPageParam: (lastGroup, allGroups) => {
      const morePageExist = lastGroup?.length === 12;

      if (!morePageExist) {
        return;
      }

      return allGroups.length + 1;
    },
  });

  // query altında gelen status değeri loading ise dönecek değer
  if (status === "loading") return "Loading...";

  // query altında gelen status değeri error ise dönecek değer
  if (status === "error") return "An error has occurred: " + error.message;

  return (
    <div>
      {/* chakra-ui grid yapısı */}
      <Grid className="products-grid" templateColumns="repeat(5, 1fr)" gap={4}>
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((item, key) => (
              <Box w="100%" key={key}>
                <Card item={item} />
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Grid>
      <Flex mt="10px" justifyContent="center">
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </Flex>
    </div>
  );
}
export default Products;
