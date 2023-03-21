import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="w-screen fixed top-0 h-20 flex justify-center items-center bg-slate-100">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
      <ul className="absolute top-6 right-6">
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
