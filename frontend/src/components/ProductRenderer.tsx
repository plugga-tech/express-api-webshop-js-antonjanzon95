import React from "react";
import { Product } from "./Products";
import { ObjectId } from "mongodb";

interface Props {
  products: Product[];
}

const ProductRenderer: React.FC<Props> = ({ products }) => {
  const addToCart = (product: Product) => {
    const productId = product._id;
    const cart = localStorage.getItem("cart");
    const parsedCart = cart ? JSON.parse(cart) : [];

    const checkProductInCart = parsedCart.find(
      (product: { _id: ObjectId }) => product._id === productId
    );

    if (checkProductInCart) {
      checkProductInCart.quantity += 1;
    } else {
      parsedCart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(parsedCart));
  };

  return (
    <>
      <div className="flex gap-4 flex-wrap justify-center">
        {products.map((product) => (
          <article
            key={product._id.toString()}
            className="flex flex-col gap-2 shadow bg-white w-[300px]"
          >
            <img
              src="/placeholder-image.png"
              alt="product-image"
              width={300}
              height={300}
            />
            <p>Name: {product.name}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>Stock: {product.lager}</p>
            <button
              onClick={() => addToCart(product)}
              className="border-2 border-black"
            >
              Add to cart
            </button>
          </article>
        ))}
      </div>
    </>
  );
};

export default ProductRenderer;
