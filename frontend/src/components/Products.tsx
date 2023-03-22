import { useState, useEffect } from "react";
import Layout from "./Layout";
import { ObjectId } from "mongodb";
import Heading from "./Heading";

interface Product {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  stock: number;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <Layout>
      <Heading name="Products" />
      <div className="flex gap-4">
        {products.map((product) => (
          <article
            key={product._id.toString()}
            className="flex flex-col gap-2 shadow bg-slate-100 w-[300px]"
          >
            <p>Name: {product.name}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock}</p>
          </article>
        ))}
      </div>
    </Layout>
  );
}

export default Products;
