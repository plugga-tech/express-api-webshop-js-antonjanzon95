import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Products from "./components/Products";
import Register from "./components/Register";
import Login from "./components/Login";
import Categories from "./components/Categories";
import Orders from "./components/Orders";
import UserContextProvider from "./context/UserContext";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Router>
        <UserContextProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/orders" element={<Orders />} />
              <Route
                path="/products/category/:categoryId"
                Component={Categories}
              />
            </Routes>
          </Layout>
        </UserContextProvider>
      </Router>
    </>
  );
}

export default App;
