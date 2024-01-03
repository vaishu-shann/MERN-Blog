import { useState } from "react";
import config from "../config";
import { Navigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  let URL = config.BACKEND_USER_BASE_URL;


   const register = async (ev) => {
    const config = {
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    };
    try {
      debugger
      const response = await fetch(URL+"register", config);
      debugger
      console.log("response", response)
      debugger
      let result = await response.json();
      debugger
      console.log("registration success", result);
      debugger
      return result;
    } catch (err) {
      console.log(err, "error");
      return false;
    }
  };

  if (redirect) {
    debugger
    return <Navigate to={'/'} />
}
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="text"
        placeholder="username"
        value={username}
        onChange={e => setUsername(e.target.value)} />
      <input type="password"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)} />
      <button>Register</button>
    </form>
  );
}