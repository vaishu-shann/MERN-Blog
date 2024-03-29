
import { useState, useEffect, useLayoutEffect } from "react";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";

export default function IndexPage() {
    let navigate = useNavigate()
    const [posts, setPosts] = useState([]);
    let auth_token = localStorage.getItem("auth")

    const getPosts = async (event) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${auth_token}`,
            },
            method: "GET",
        };
        try {
            const response = await fetch('http://localhost:5001/api/posts', config)

            console.log("response", response);

            let result = await response.json();

            console.log("result", result);
            if (result) {

                setPosts(result);
            }

        } catch (e) {
            console.log("error in fetching post", e)
            return false
        }
    }

    useLayoutEffect(() => {
        if (!auth_token) {
            navigate("/login")
        }
    }, [])

    useEffect(() => {
        getPosts()
    }, []);

    return (
        <>

            {posts?.map((post, index) => {
                console.log("post", post)
                return (

                    <Post {...post} />
                )
            })}
        </>
    );
}