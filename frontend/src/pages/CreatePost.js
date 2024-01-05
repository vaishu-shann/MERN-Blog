
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from '../components/Editor';


export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const auth_token = localStorage.getItem("auth")

  const createNewPost = async (ev) => {
    try {
      let data = {
        title,
        summary,
        content,
      }
      ev.preventDefault();
      const response = await fetch('http://localhost:5001/api/posts', {
        method: 'POST',
        body: JSON.stringify(data),
        Authorization: auth_token,
      });
      let result = await response.json();
      console.log("result", result)
      // if (response.ok) {
      //   setRedirect(true);
      // }
    } catch (e) {
      console.log("error in creating post", e)
      return false;
    }
  }
  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <div >
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
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '5px' }} onClick={createNewPost}>Create post</button>
    </div>
  );
}