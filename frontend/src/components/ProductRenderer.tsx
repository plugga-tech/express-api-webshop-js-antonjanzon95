import React from "react";
import { Product } from "./Products";

interface Props {
  products: Product[];
}

const ProductRenderer: React.FC<Props> = ({ products }) => {
  return (
    <>
      <div className="flex gap-4 flex-wrap justify-center">
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
    </>
  );
};

export default ProductRenderer;
