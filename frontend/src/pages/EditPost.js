import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../components/Editor";

export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('You can connect to MongoDB with the mongoose.connect() method');
  const [summary,setSummary] = useState('This is the minimum needed to connect the myapp database running locally on the default port (27017). For local MongoDB databases, we recommend using 127.0.0.1 instead of localhost. That is because Node.js 18 and up prefer IPv6 addresses, which means, on many machines');
  const [content,setContent] = useState('This is the minimum needed to connect the myapp database running locally on the default port (27017). That is because Node.js 18 and up prefer IPv6 addresses, which means, on many machines');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);



  async function updatePost(ev) {
    ev.preventDefault();
  
      setRedirect(true);
    
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  return (
    <form onSubmit={updatePost}>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button style={{marginTop:'5px'}}>Update post</button>
    </form>
  );
}