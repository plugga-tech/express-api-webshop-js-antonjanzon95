import { useState, useEffect } from "react";
import Layout from "./Layout";
import { ObjectId } from "mongodb";
import Heading from "./Heading";
import ProductRenderer from "./ProductRenderer";
import CategoryNavigation from "./CategoryNavigation";

export interface Product {
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
      <CategoryNavigation />
      <Heading name="All Products" />
      <ProductRenderer products={products} />
    </Layout>
  );
}

export default Products;
