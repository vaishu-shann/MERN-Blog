
import {Link} from "react-router-dom";

export default function Post({_id,title,summary,cover,content,createdAt,author}) {

  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={"https://miro.medium.com/v2/resize:fit:828/format:webp/1*wf7kYTiGEMbKxKuRspbS2A.png"} alt=""/>
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
        </Link>
        {/* <p className="info">
          <a className="author">{author.username}</a>
        </p> */}
         <p className="info">{summary}</p>
        <p className="summary">{content}</p>
      </div>
    </div>
  );
}