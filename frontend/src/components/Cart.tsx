import { useState, useEffect } from "react";
import Layout from "./Layout";
import { ObjectId } from "mongodb";
import Heading from "./Heading";
import { v4 as uuidv4 } from "uuid";
import LoginForm from "./LoginForm";

interface Product {
  _id: ObjectId;
  name: string;
  price: number;
  quantity: number;
}

interface User {
  email: string;
  name: string;
  _id: ObjectId;
}

function Cart() {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const cartItems = localStorage.getItem("cart");

    if (cartItems) {
      setProducts(JSON.parse(cartItems));
    }
    currentUser();
  }, []);

  const currentUser = async () => {
    const userEmail = localStorage.getItem("emailLoggedIn");
    const response = await fetch("http://localhost:3000/api/users/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail }),
    });
    const data = await response.json();
    setUser(data);
  };

  console.log(products.map(({ _id, quantity }) => ({ _id, quantity })));

  const handleOrder = async () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      return alert("You must be logged in!");
    }

    const response = await fetch("http://localhost:3000/api/orders/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user?._id,
        products: products.map(({ _id, quantity }) => ({ _id, quantity })),
      }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Order successfully placed!");
      handleClearCart();
    } else {
      alert("Something went wrong.");
    }
  };

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setProducts([]);
  };

  return (
    <Layout>
      <Heading name="Cart" />
      <div className="flex gap-4 flex-wrap justify-center">
        {products.map((product) => (
          <article
            key={uuidv4()}
            className="flex flex-col gap-2 shadow bg-slate-100 w-[300px]"
          >
            <p>Name: {product.name}</p>
            <p>Price: {product.price}</p>
            <p>Amount: {product.quantity}</p>
            <p>Total: {product.price * product.quantity}</p>
          </article>
        ))}
      </div>
      <div>
        {localStorage.getItem("isLoggedIn") !== "true" ? (
          <div>
            <p className="text-center font-extrabold">
              Please login before sending order.
            </p>
            <LoginForm navOnLogin="/cart" />
          </div>
        ) : (
          <div className="text-center">
            <p>Hello, {user ? user.name : ""}! Feel free to send your order</p>
            <button
              onClick={() => handleOrder()}
              className="border-2 border-black px-2 bg-gray-400"
            >
              Send order
            </button>
            <button onClick={() => handleClearCart()}>Clear cart</button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Cart;
