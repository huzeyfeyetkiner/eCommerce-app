import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../../../api";

function AdminOrders() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["admin:orders"],
    queryFn: fetchOrders,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  console.log(data);

  return <div>{JSON.stringify(data)}</div>;
}
export default AdminOrders;
