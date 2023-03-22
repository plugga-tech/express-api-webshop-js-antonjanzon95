import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedInCheck = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(isLoggedInCheck === "true");
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
  };

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
      {!isLoggedIn ? (
        <ul className="absolute top-4 right-4">
          <li className="hover:text-cyan-800">
            <Link to="/register">Register</Link>
          </li>
          <li className="hover:text-cyan-800">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      ) : (
        <span className="hover:text-cyan-800 absolute top-6 right-6">
          <button onClick={handleLogout}>Logout</button>
        </span>
      )}
    </nav>
  );
}

export default Navigation;
