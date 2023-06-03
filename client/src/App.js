import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Index";
import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Sigin";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

console.log(process.env.REACT_APP_BASE_END_POINT);

function App() {
  return (
    <div className="App">
      <Navbar />

      <div id="content">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;