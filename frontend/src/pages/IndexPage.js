
import { useState, useEffect } from "react";
import Post from "../components/Post";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    let auth_token = localStorage.getItem("auth")

    const getPosts = async (event) => {
        event.preventDefault()
        const config = {
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache,no-store",
                Authorization: auth_token,
            },
            method: "GET",
        };
        try {
            const response = await fetch('http://localhost:5001/api/posts', config)
            let result = await response.json();
            console.log("result", result);
            setPosts(result);

        } catch (e) {
            console.log("error in fetching post", e)
            return false
        }
    }

    useEffect(() => {
        getPosts()
    }, [auth_token]);

    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post {...post} />
            ))}
        </>
    );
}