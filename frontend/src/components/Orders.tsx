import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Heading from "./Heading";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";
import { User } from "./Cart";

interface Order {
  _id: ObjectId;
  user: string;
  products: {
    productId: ObjectId;
    quantity: number;
  }[];
}

// interface Product {
//   _id: ObjectId;
//   quantity: number;
// }

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    let unsubscribed = false;
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

    currentUser();

    return () => {
      unsubscribed = true;
    };
  }, []);

  useEffect(() => {
    let unsubscribed = false;
    const fetchOrders = async () => {
      if (!user) return console.log("No user");
      const userId = user._id;
      const response = await fetch("http://localhost:3000/api/orders/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userId, token: "1234key1234" }),
      });
      const data = await response.json();
      setOrders(data);
      console.log(data);
    };

    if (user) {
      fetchOrders();
    }
    return () => {
      unsubscribed = true;
    };
  }, [user]);

  return (
    <Layout>
      <Heading name="Orders" />
      <div className="flex gap-4 flex-wrap justify-center">
        {orders.map((order) => (
          <article
            key={uuidv4()}
            className="flex flex-col gap-2 shadow bg-slate-100 w-[300px]"
          >
            <h2>Order number: {order._id.toString()}</h2>
            <h2>Products: </h2>
            <ul>
              {order.products.map((product) => (
                <li key={uuidv4()}>
                  Product Id: 123 - Product amount: {product.quantity}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Layout>
  );
};

export default Orders;
