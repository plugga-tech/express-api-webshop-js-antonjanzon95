import { useState, useEffect, useContext } from "react";
import Heading from "./Heading";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";
import { UserContext } from "../context/UserContext";

interface Product {
  _id: ObjectId;
  name: string;
  description: string;
  category: ObjectId;
  lager: number;
}

interface Order {
  _id: ObjectId;
  user: string;
  products: {
    productId: Product;
    quantity: number;
  }[];
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const userContext = useContext(UserContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (userContext.user === null) return console.log("No user");
      const userId = userContext.user._id;
      const response = await fetch("http://localhost:3000/api/orders/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userId, token: "1234key1234" }),
      });
      const data = await response.json();
      console.log(data);
      setOrders(data);
    };

    fetchOrders();

    return () => {
      setOrders([]);
    };
  }, [userContext.user]);

  return (
    <>
      <Heading name="Orders" />
      {orders.length < 1 ? (
        <h2 className="font-bold text-xl text-center">No orders to show...</h2>
      ) : (
        <div className="flex gap-4 flex-wrap justify-center">
          {orders.map((order) => (
            <article
              key={uuidv4()}
              className="flex flex-col gap-2 shadow bg-slate-100 w-[300px]"
            >
              <h2>Order number: {order._id.toString()}</h2>
              <h2>Products: </h2>
              <ul className="flex flex-col gap-2">
                {order.products.map((product) => (
                  <li key={uuidv4()}>
                    Product name: {product.productId.name} <br />
                    Product amount: {product.quantity}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </>
  );
};

export default Orders;
