import React, { useContext, useState } from 'react';
import './styles/CreatePost.css'
import { useKeycloak } from '@react-keycloak/web'
import { BlogContext } from "../App.js";
import PostPage from './PostPage'
import { useNavigate } from 'react-router-dom'



const EditPost = ({ post, setEdit }) => {
  const { keycloak, initialized } = useKeycloak()
  const blogContext = useContext(BlogContext);
  const [originalPost, setOriginalPost] = useState(post)
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [showPreview, setShowPreview] = useState(false)
  const [isPublic, setIsPublic] = useState(!!post.public)
  const navigate = useNavigate()

  const editPostHandler = async (event) => {
    event.preventDefault();
    if (isPublic === !!post.public && title === post.title && content === post.content) {
      alert('Please make edits before submitting.')
    } else if (window.confirm("Are you sure you want to edit this post?")) {
      let modifiedPost = {};

      isPublic !== !!post.public && (modifiedPost.public = isPublic ? 1 : 0);
      title !== post.title && (modifiedPost.title = title);
      content !== post.content && (modifiedPost.content = content);
      (modifiedPost.username = keycloak.tokenParsed.preferred_username);
      (modifiedPost.modified = (new Date()).toISOString());

      const request = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${keycloak.token}`
        },
        body: JSON.stringify(modifiedPost)
      }

      let confirmation = await fetch(`${blogContext.serverURL}/api/posts/${post.id}`, request)
        .then(response => {
          if (response.status === 200) {
            return response.json()
          }
        })
        .then(newPost => newPost)
        .catch(err => console.log(err))

      if (confirmation?.title === title) {
        blogContext.getPosts()
        setEdit(false)
        blogContext.setCurrentPost(confirmation)
      } else {
        alert('Error occurred while attempting to edit post.')
      }
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
      blogContext.setCurrentPost(originalPost)
    } else {
      blogContext.setCurrentPost({
        id: -1,
        public: isPublic ? 1 : 0,
        title,
        content,
        username: keycloak.tokenParsed.preferred_username + ' ',
        created: (new Date()).toISOString(),
        modified: (new Date()).toISOString()
      })
    }
    setShowPreview(!showPreview)
  }

  const cancelEdit = () => {
    blogContext.setCurrentPost(originalPost)
    setEdit(false)
  }

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to permanently delete this post?")) {
      const request = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${keycloak.token}`
        }
      }
      let confirmation = await fetch(`${blogContext.serverURL}/api/posts/${post.id}`, request)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then(deletedPost => deletedPost)
        .catch(err => console.log(err));

      if (confirmation?.title === title) {
        blogContext.getPosts();
        setEdit(false);
        blogContext.setCurrentPost(null);
        navigate('/');
      } else {
        alert('Error occurred while attempting to delete post.');
      }
    }
  }

  return (
    <div className='create-post-wrapper'>
      <button type='button' className='button' onClick={cancelEdit}>Cancel Edit</button>
      {showPreview ?
        <>
          <button type='button' className='button' onClick={previewHandler}>Cancel Preview</button>
          <PostPage />
        </> :
        <div className='create-post'>
          <form className='create-post-form' onSubmit={editPostHandler}>
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
              <input className='button' type='submit' value='Edit Post!'/>
              <button type='button' className='button' onClick={previewHandler}>Preview</button>
            </div>
          </form>
        </div>
      }
    <button type='button' className='button delete' onClick={deletePost}>Delete Post!</button>
    </div>
  )
}

export default EditPost;