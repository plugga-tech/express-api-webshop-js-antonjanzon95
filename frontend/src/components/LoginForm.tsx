import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = { email: email, password: password };
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("User logged in");
      alert("You have been logged in!");
      navigate("/");
    } else {
      const { message } = await response.json();
      alert(message);
      console.log("Error logging in user");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-4"
      >
        Enter your credentials to login
        <label className="flex flex-col">
          Email
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="border-2 border-slate-900"
          />
        </label>
        <label className="flex flex-col">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="border-2 border-slate-900"
          />
        </label>
        <button type="submit" className="border-2 border-slate-900 px-2">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
