
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from '../components/Editor';
import { createRef } from 'react';

export default function CreatePost() {
  const fileInput = createRef();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState();
  const [redirect, setRedirect] = useState(false);
  const [uploadedFile, setUploadedFile] = useState();
  const [error, setError] = useState();
  const auth_token = localStorage.getItem("auth")


  async function uploadImagePost(e) {

    const formData = new FormData();
    formData.set("avatar", fileInput.current.files[0])
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${auth_token}`,
      },
      method: "POST",
      body: formData,
    };
    try {
      const response = await fetch('http://localhost:5001/api/posts/upload', {
        method: "POST",
        body: formData
      });
      console.log("response", response)
      let result = await response.json();
      if (result) {

        return result;
      }
      return false;
    } catch (err) {
      console.log(err)
      return
    }
  }

  // const uploadImagePost = async (ev) => {
  //   try {

  //     console.log("image file", file)
  //     const formData = new FormData();
  //     formData.append('image', file);
  //     // formData.append('fileName', file.name);
  //     for (var key of formData.entries()) {
  //       console.log("form data value", key[1])
  //     }
  //     const config = {
  //       headers: {
  //         'Content-type': 'multipart/form-data',
  //         Authorization: `Bearer ${auth_token}`,
  //       },
  //       method: "POST",
  //       // body:bod(formData),
  //     };

  //     const response = await fetch('http://localhost:5001/api/posts/upload', formData, config);
  //     console.log("response", response)
  //     let result = await response.json();
  //     console.log("login success", result);
  //     // setUploadedFile(result.file)
  //     return result;
  //   } catch (e) {
  //     console.log("error in uploading Image", e)
  //     setError("Error in Upload image");
  //     return false;
  //   }
  // }

  const createNewPost = async (ev) => {
    try {
      let ImageResult = await uploadImagePost(ev);
      const imageName = ImageResult.avatar.name
      const parts = imageName.split('.');
      const FirstPart = parts[0]
      console.log("ImageResult ", FirstPart)
      if (!ImageResult) {
        return false;
      }
      let data = {
        title,
        summary,
        content,
        cover: ImageResult.avatar.name,
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        method: "POST",
      };
      const response = await fetch('http://localhost:5001/api/posts', config);

      if (response.ok) {
        const result = await response.json();
        console.log("Post created successfully:", result);
        setRedirect(true);
      } else {
        console.error("Failed to create post:", response.statusText);
      }
    } catch (e) {
      console.log("error in creating post", e)
      return false;
    }
  }
  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    < >
      <input type="title"
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)} />
      <input type="file" ref={fileInput}
        onChange={(ev) => setFile(ev.target.files[0])} />
      <Editor value={content} onChange={setContent} />
      {/* <input type='submit' /> */}
      <button style={{ marginTop: '5px' }} onClick={createNewPost}>Create post</button>
      {error && <p>Error uploading file: {error}</p>}
    </>
  );
}