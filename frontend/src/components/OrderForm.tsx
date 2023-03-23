import React, { useState } from "react";
import Heading from "./Heading";
import LoginForm from "./LoginForm";

const OrderForm = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Heading name="Order Form" />

      {localStorage.getItem("isLoggedIn") !== "true" ? (
        <LoginForm navOnLogin="/cart" />
      ) : (
        <button>Send Order</button>
      )}
    </>
  );
};

export default OrderForm;
