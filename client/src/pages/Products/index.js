import Card from "../../components/Card";
import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductList } from "../../api";

function Products() {
  // react-query ile beraber data fetch edebilmek için
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductList,
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        {data.map((item, key) => {
          return <Card key={key} item={item} />;
        })}
      </Grid>
    </div>
  );
}
export default Products;
