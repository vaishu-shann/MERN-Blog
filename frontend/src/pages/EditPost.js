import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../components/Editor";

export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);
  let auth_token = localStorage.getItem("auth")

  const getPostsbyId = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth_token}`,
      },
      method: "GET",
    };
    try {
      const response = await fetch(`http://localhost:5001/api/posts/${id}`, config)
      let postInfo = await response.json();
      console.log("postInfo", postInfo);
      if (postInfo  ) {       
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      }

    } catch (e) {
      console.log("error in fetching post", e)
      return false
    }
  }

  useEffect(() => {
    getPostsbyId()
  }, [auth_token]);


  const updatePost = async() => {
    try{
      let data = {
        title,
        summary,
        content,
        id,
      }
      const response = await fetch('http://localhost:5001/api/posts', {
        method: 'PUT',
        body: JSON.stringify(data),
        // Authorization: auth_token,
      });
      let result = await response.json();
      console.log("result", result)
      if (response.ok) {
        setRedirect(true);
      }
    }catch(e){
      console.log("error in update post" , e);
      return false;
    }
  }


  if (redirect) {
    return <Navigate to={'/post/'+id} />
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
      <Editor onChange={setContent} value={content} />
      <button style={{marginTop:'5px'}}  onClick={updatePost}>Update post</button>
    </div>
  );
}