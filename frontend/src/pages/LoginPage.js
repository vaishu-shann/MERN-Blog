import {  useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import {UserContext} from "../context/UserContext";


export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);


    const login = async (ev) => {
        const config = {
          body: JSON.stringify({ username, password }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          credentials: 'include',
        };
        try {
          debugger
          const response = await fetch("http://localhost:5001/api/users/login", config);
          debugger
          console.log("response", response)
          debugger
          let result = await response.json();
          debugger
          console.log("login success", result);
          debugger
          return result;
        } catch (err) {
          console.log(err, "error");
          return false;
        }
      };

 
    
    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text"
                placeholder="username"
                value={username}
                onChange={e => setUsername(e.target.value)} />
            <input type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)} />
            <button>Login</button>
        </form>
    );
}