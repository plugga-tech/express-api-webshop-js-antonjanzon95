import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Heading from "./Heading";
import { Product } from "./Products";
import Layout from "./Layout";
import ProductRenderer from "./ProductRenderer";
import CategoryNavigation from "./CategoryNavigation";

function Categories() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCategoryName = async () => {
      const response = await fetch(
        `http://localhost:3000/api/categories/${categoryId}`
      );
      const data = await response.json();
      setCategory(data[0].name);
    };

    const fetchProductsByCategory = async () => {
      const response = await fetch(
        `http://localhost:3000/api/products/category/${categoryId}`
      );
      const data = await response.json();
      setProducts(data);
    };
    fetchCategoryName();
    fetchProductsByCategory();
  }, [categoryId]);

  return (
    <>
      <CategoryNavigation />
      <Heading name={`${category} Products`} />
      <ProductRenderer products={products} />
    </>
  );
}

export default Categories;
