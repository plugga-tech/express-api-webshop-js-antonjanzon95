import React from "react";
import { Link } from "react-router-dom";

const CategoryNavigation = () => {
  return (
    <>
      <nav className="w-screen h-10 bg-gray-800 text-cyan-600">
        <ul className="mx-auto max-w-[800px] flex gap-8">
          <li>
            <Link to={"/products/category/6419a03abb45d66eea98b76f"}>Cats</Link>
          </li>
          <li>
            <Link to={"/products/category/6419a1a1931782cf9ffcf4ea"}>Dogs</Link>
          </li>
          <li>
            <Link to={"/products/category/641b5a2708d2fd271cfe421e"}>Fish</Link>
          </li>
          <li>
            <Link to={"/products/category/641b5a2c08d2fd271cfe4220"}>
              Secret
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default CategoryNavigation;
