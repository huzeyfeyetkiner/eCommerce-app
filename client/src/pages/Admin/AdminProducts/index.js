import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProductList, deleteProduct } from "../../../api";
import { Table, Popconfirm, Button } from "antd";
import { Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useMemo } from "react";

function AdminProducts() {
  //silme işlemi sonrası refetch işlemi için
  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery({
    queryKey: ["admin:products"],
    queryFn: fetchProductList,
  });

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"), //refetch işlemi gerçekleşiyor
  });

  // antdesign ile beraber gelen table column'larını belirlemek için kullanıldı
  // usememo ile beraber gereksiz render işleminden kurtuluyoruz.
  const columns = useMemo(() => {
    return [
      {
        title: "title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Action",
        key: "Action",
        render: (text, record) => (
          <>
            <Link to={`./${record._id}`}>Edit</Link>
            <Popconfirm
              title="Are you sure"
              description="Are you sure to delete this task?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {
                    console.log("Success");
                  },
                });
              }}
              onCancel={() => {
                console.log("cancelled");
              }}
              placement="left"
            >
              <Button style={{ marginLeft: "10px" }}>Delete</Button>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, [deleteMutation]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center">
        <Text p="5" fontSize="2xl">
          Products
        </Text>

        <Link to="new">
          <Button>New</Button>
        </Link>
      </Flex>

      <Table dataSource={data} columns={columns} rowKey={"_id"} />
    </div>
  );
}
export default AdminProducts;
