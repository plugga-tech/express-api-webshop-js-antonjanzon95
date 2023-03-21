import { useState, useEffect } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
}

function App() {
  const [test, setTest] = useState<User[]>([]);

  useEffect(() => {
    let unsubscribed = false;
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/api/users");
      const data = await response.json();
      if (!unsubscribed) {
        console.log(data);
        setTest(data);
      }
    };
    fetchUsers();

    return () => {
      unsubscribed = true;
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      Hello World
      <div>
        <ul>
          {test.map((user) => (
            <li key={user._id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
