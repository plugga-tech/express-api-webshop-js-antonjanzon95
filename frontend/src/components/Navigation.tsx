import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="w-screen fixed top-0 h-20 flex justify-center items-center bg-gray-300 text-gray-900 font-extrabold">
      <ul className="flex gap-10">
        <li className="hover:text-cyan-800">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-cyan-800">
          <Link to="/products">Products</Link>
        </li>
        <li className="hover:text-cyan-800">
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
      <ul className="absolute top-4 right-4">
        <li className="hover:text-cyan-800">
          <Link to="/register">Register</Link>
        </li>
        <li className="hover:text-cyan-800">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
