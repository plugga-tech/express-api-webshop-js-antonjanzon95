import { ObjectId } from "mongodb";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface Category {
  _id: ObjectId;
  name: string;
}

const CategoryNavigation = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3000/api/categories");
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <>
      <nav className="h-10 bg-gray-300 text-gray-900 font-extrabold flex items-center justify-center">
        <ul className="max-w-[800px] flex gap-8">
          {categories.map((category) => (
            <li key={uuidv4()}>
              <Link to={`/products/category/${category._id}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default CategoryNavigation;
