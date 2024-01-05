import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("Vaishu")
  let auth_token = localStorage.getItem("auth")



  function logout() {
   localStorage.clear();
   navigate("/login")
  }


  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {auth_token && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout </a>
          </>
        )}
        {!auth_token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>

  );
}