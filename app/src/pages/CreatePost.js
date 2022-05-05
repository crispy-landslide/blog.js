import React, { useContext, useState } from 'react';
import './styles/CreatePost.css'
import { useKeycloak } from '@react-keycloak/web'
import { BlogContext } from "../App.js";
import PostPage from './PostPage'
import { useNavigate } from 'react-router-dom'



const CreatePost = () => {
  const { keycloak, initialized } = useKeycloak()
  const blogContext = useContext(BlogContext);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [showPreview, setShowPreview] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const navigate = useNavigate()

  const createPostHandler = async (event) => {
    event.preventDefault()
    let newPost = {
      public: isPublic ? 1 : 0,
      title,
      content,
      username: keycloak.tokenParsed.preferred_username,
      created: (new Date()).toISOString(),
      modified: (new Date()).toISOString()
    }
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keycloak.token}`
      },
      body: JSON.stringify(newPost)
    }

    let confirmation = await fetch(`${blogContext.serverURL}/api/posts`, request)
      .then(response => response.json())
      .then(newPost => newPost)
      .catch(err => console.log(err))

      if (confirmation?.title === title) {
      blogContext.getPosts()
      navigate('/')
    } else {
      alert('Error occurred while attempting to create post.')
    }

  }

  const changeTitle = (event) => {
    setTitle(event.target.value)
  }

  const changeContent = (event) => {
    setContent(event.target.value)
  }

  const previewHandler = () => {
    if (showPreview) {
      blogContext.setCurrentPost(null)
    } else {
      blogContext.setCurrentPost({
        id: -1,
        public: isPublic ? 1 : 0,
        title,
        content,
        username: keycloak.tokenParsed.preferred_username,
        created: (new Date()).toISOString(),
        modified: (new Date()).toISOString()
      })
    }
    setShowPreview(!showPreview)
  }

  return (
    <div className='create-post-wrapper'>
      {showPreview ?
        <>
          <button type='button' className='button' onClick={previewHandler}>Cancel Preview</button>
          <PostPage />
        </> :
        <div className='create-post'>
          <form className='create-post-form' onSubmit={createPostHandler}>
            <div className='is-public'>
              <span className='checkbox-label'>Public ?</span>
              <label className="switch">
                <input type="checkbox" id='public' name='public' checked={isPublic ? 'checked' : ''} onChange={() => setIsPublic(!isPublic)} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className='create-post-label'>
              Title
            </div>
            <div className='create-post-value title'>
              <textarea className='textarea' name='title' id='title' placeholder='Post Title' defaultValue={title} onChange={changeTitle} required/>
            </div>
            <div className='create-post-label'>
              Content:
            </div>
            <div className='create-post-value content'>
              <textarea className='textarea' name='content' id='content' placeholder='What do you have to say?' defaultValue={content} onChange={changeContent} required/>
            </div>
            <div className='post-buttons'>
              <input className='button' type='submit' value='Create Post!'/>
              <button type='button' className='button' onClick={previewHandler}>Preview</button>
            </div>
          </form>
        </div>
      }
    </div>
  )
}

export default CreatePost;