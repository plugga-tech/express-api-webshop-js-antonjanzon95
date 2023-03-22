import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const data = { name: name, email: email, password: password };
    const response = await fetch("http://localhost:3000/api/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("User added");
      alert("Registration completed, you are now able to login.");
      navigate("/login");
    } else {
      console.log("Error adding user");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-4"
      >
        <h2>Enter your credentials to register</h2>
        <label className="flex flex-col">
          Name
          <input
            type="text"
            className="border-2 border-slate-900"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
          />
        </label>
        <label className="flex flex-col">
          Email
          <input
            type="text"
            className="border-2 border-slate-900"
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
          />
        </label>
        <label className="flex flex-col">
          Password
          <input
            type="password"
            className="border-2 border-slate-900"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
          />
        </label>
        <label className="flex flex-col">
          Confirm Password
          <input
            type="password"
            className="border-2 border-slate-900"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>
        <button type="submit" className="border-2 border-slate-900 px-2">
          Register
        </button>
      </form>
    </>
  );
}

export default RegisterForm;
