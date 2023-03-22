import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Products from "./components/Products";
import Register from "./components/Register";
import Login from "./components/Login";
import Categories from "./components/Categories";

interface User {
  _id: string;
  name: string;
  email: string;
}

function App() {
  const [test, setTest] = useState<User[]>([]);

  useEffect(() => {
    let unsubscribed = false;
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/api/users");
      const data = await response.json();
      if (!unsubscribed) {
        console.log(data);
        setTest(data);
      }
    };
    fetchUsers();

    return () => {
      unsubscribed = true;
    };
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/category/:categoryId" Component={Categories} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
