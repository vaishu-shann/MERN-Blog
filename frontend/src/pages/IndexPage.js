
import { useState } from "react";
import Post from "../components/Post";

export default function IndexPage() {

    const postFeed = [{
        _id: 1, title: "You can connect to MongoDB with the mongoose.connect() method.", author: { username: "Ujjwal" }, summary: "This is the minimum needed to connect the myapp database running locally on the default port (27017). For local MongoDB databases, we recommend using 127.0.0.1 instead of localhost. That is because Node.js 18 and up prefer IPv6 addresses, which means, on many machines, "
    },
    {
        _id: 2, title: "There are two classes of errors that can occur with a Mongoose connection.", author: { username: "Vaishu" }, summary: " The maximum number of sockets the MongoDB driver will keep open for this connection. By default, maxPoolSize is 100. Keep in mind that MongoDB only allows one operation per socket at a time, so you may want to increase this if you find you have a few slow queries that are blocking faster queries from proceeding. See Slow Trains in MongoDB and Node.js. "
    }
    ]
    const [posts, setPosts] = useState(postFeed);
    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post {...post} />

            ))}
        </>
    );
}