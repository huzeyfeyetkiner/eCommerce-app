import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Index";
import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Sigin";
import Products from "./pages/Products";

function App() {
  return (
    <div className="App">
      <Navbar />

      <div id="content">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
