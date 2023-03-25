import React from "react";

interface Title {
  name: string;
}

const Heading: React.FC<Title> = ({ name }) => {
  return <h1 className="text-center font-extrabold text-4xl my-6">{name}</h1>;
};

export default Heading;
