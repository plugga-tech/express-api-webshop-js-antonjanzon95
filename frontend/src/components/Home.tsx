import { useContext } from "react";
import Heading from "./Heading";
import { UserContext } from "../context/UserContext";

function Home() {
  const userContext = useContext(UserContext);

  return (
    <>
      <Heading name="Home" />
      <h2 className="text-center">Welcome, {userContext.user?.name}!</h2>
    </>
  );
}

export default Home;
