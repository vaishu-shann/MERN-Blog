import {  useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import {UserContext} from "../context/UserContext";


export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);


    const login = async (event) => {
        event.preventDefault()
        const config = {
          body: JSON.stringify({ username, password }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        };
        try {          
          const response = await fetch("http://127.0.0.1:5001/api/users/login", config);          
          console.log("response", response)          
          let result = await response.json();          
          console.log("login success", result);          
          localStorage.setItem("auth", result.token)
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
        <div className="login" >
            <h1>Login</h1>
            <input type="text"
                placeholder="username"
                value={username}
                onChange={e => setUsername(e.target.value)} />
            <input type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)} />
            <button onClick={login}>Login</button>
        </div>
    );
}