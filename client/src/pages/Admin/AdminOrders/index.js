import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../../../api";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from "@chakra-ui/react";

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

  return (
    <div>
      <Text fontSize="2xl">Orders</Text>

      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Table of orders</TableCaption>
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Address</Th>
              <Th isNumeric>Items</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((order) => {
              return (
                <Tr key={order._id}>
                  <Th>{order.user.email}</Th>
                  <Th>{order.address}</Th>
                  <Th isNumeric>{order.items.length}</Th>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>User</Th>
              <Th>Address</Th>
              <Th>Items</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}
export default AdminOrders;
