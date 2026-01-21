import { useState } from "react";
import { loginUser } from "../services/authapi";

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = await loginUser({ email, password });
  console.log(data);
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Login</button>
    </form>
  );
}
