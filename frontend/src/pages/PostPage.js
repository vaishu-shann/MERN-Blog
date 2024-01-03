import { useState} from "react";
import {Link} from 'react-router-dom';

export default function PostPage() {
  const [postInfo,setPostInfo] = useState({ _id: 1, title: "You can connect to MongoDB with the mongoose.connect() method.", author: { username: "Umang" }, content: "This is the minimum needed to connect the myapp database running locally on the default port (27017). For local MongoDB databases, we recommend using 127.0.0.1 instead of localhost. That is because Node.js 18 and up prefer IPv6 addresses, which means, on many machines, "});



  if (!postInfo) return '';

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <div className="author">by @{postInfo.author.username}</div>
   
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post
          </Link>
        </div>
    
      <div className="image">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9JA3u5Unx3T-w4xp5MttlBzprpOoyr4JhYA&usqp=CAU" alt=""/>
      </div>
      <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
    </div>
  );
}