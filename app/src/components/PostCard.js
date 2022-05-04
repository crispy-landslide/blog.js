import React, {useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/PostCard.css'
import { useKeycloak } from '@react-keycloak/web'
import { BlogContext } from "../App.js";


const PostCard = ({ post }) => {
  const { keycloak, initialized } = useKeycloak()
  const blogContext = useContext(BlogContext);
  const [preview, setPreview] = useState()
  const [shortTitle, setShortTitle] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    if (post.content.length > 100) {
      setPreview(post.content.slice(0, 100) + ' . . .')
    } else {
      setPreview(post.content)
    }

    if (post.title.length > 80) {
      setShortTitle(post.title.slice(0, 80) + ' . . .')
    } else {
      setShortTitle(post.title)
    }

  }, [post, blogContext.currentPost])

  const openPost = () => {
    blogContext.setCurrentPost(post)
    console.log(post)
    navigate(`/posts/${post.id}`)
  }

  return (
    <div className='post-card-wrapper'>
      <div className='post-card-attributes'>
        <div className={`public ${post.username === keycloak.tokenParsed?.preferred_username && 'hightlight'}`}>
          {post.public ?
            <><img className='svg' src='/earth-americas-solid.svg' alt=''/>Public</> :
            <><img className='svg' src='/lock-solid.svg' alt=''/>Private</>}
        </div>
        <div className={`user ${post.username === keycloak.tokenParsed?.preferred_username && 'hightlight'}`}>
          {post.username}
        </div>
      </div>
      <div key={post.id} className='post-card' onClick={openPost}>
        <div className='post-card-title'>
          {shortTitle}
        </div>
        <hr className='rule'/>
        <div className='post-card-content'>
          {preview}
        </div>
      </div>
    </div>

  )
}

export default PostCard;