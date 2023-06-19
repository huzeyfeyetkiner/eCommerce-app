import { Link, Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import "./styles.css";
import AdminOrders from "../Admin/AdminOrders";
import AdminProducts from "../Admin/AdminProducts";
import AdminHome from "../Admin/AdminHome";

function Admin() {
  return (
    <div>
      <ul className="admin-menu">
        <li>
          <Link to={"/admin"}>Home</Link>
        </li>
        <li>
          <Link to={"/admin/orders"}>Orders</Link>
        </li>
        <li>
          <Link to={"/admin/products"}>Products</Link>
        </li>
      </ul>

      <Box mt="10">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Routes>
      </Box>
    </div>
  );
}
export default Admin;
