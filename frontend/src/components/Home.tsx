import { useContext } from "react";
import Layout from "./Layout";
import Heading from "./Heading";
import { UserContext } from "../context/UserContext";

function Home() {
  const userContext = useContext(UserContext);
  console.log(userContext.user);

  return (
    <>
      <Heading name="Home" />
      Welcome, {userContext.user?.name}!
    </>
  );
}

export default Home;
