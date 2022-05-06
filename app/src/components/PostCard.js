import React, {useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles/PostCard.css'
import { useKeycloak } from '@react-keycloak/web'
import { BlogContext } from "../App.js";


const PostCard = ({ post }) => {
  const { keycloak, initialized } = useKeycloak()
  const blogContext = useContext(BlogContext);
  const [preview, setPreview] = useState()
  const [shortTitle, setShortTitle] = useState()
  const [created] = useState(new Date(post.created))
  const [modified] = useState(new Date(post.modified))
  const navigate = useNavigate()

  const formatDate = (date) => {
    let hours = date.getHours().toString().padStart(2, '0')
    let minutes = date.getMinutes().toString().padStart(2, '0')
    return ` ${date.toDateString()} at ${hours}:${minutes}`
  }

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

  }, [post, blogContext.currentPost, blogContext.allPosts, blogContext.publicPosts])

  const openPost = (e) => {
    if (e.target.id !== 'user-link') {
      blogContext.setCurrentPost(post)
      navigate(`/posts/${post.id}`)
    }
  }

  const goToUser = () => {
    if (keycloak.authenticated) {
      blogContext.setOtherUserPosts(blogContext.allPosts.filter(allPost => allPost.username === post.username))
    } else {
      blogContext.setOtherUserPosts(blogContext.publicPosts.filter(publicPost => publicPost.username === post.username))
    }
    navigate(`/user/${post.username}`)
  }

  return (
    <div key={post.id} className={`post-card-wrapper ${post.username === keycloak.tokenParsed?.preferred_username ? 'my-card' : 'other-card'}`}  onClick={openPost}>
      <div className='post-card-attributes'>
        <div className={`public`}>
          {post.public ?
            <><img className='svg' src='/earth-americas-solid.svg' alt=''/>Public</> :
            <div className='private'><img className='svg' src='/lock-solid.svg' alt=''/>Private</div>
          }
        </div>
      </div>
      <div className={`post-card`}>
        <div className='post-card-title'>
          {shortTitle}
        </div>
        <div className='post-card-attributes'>
          <Link to={`/user/${post.username}`} className='link' onClick={goToUser}>
            <div className={`user ${post.username === keycloak.tokenParsed?.preferred_username && 'hightlight'}`} id='user-link'>
              {post.username}
            </div>
          </Link>
        </div>
        <hr className='rule'/>
        <div className='post-card-content'>
          {preview}
        </div>
      </div>
      <div className='post-card-timestamps'>
        <div className={`public ${post.username === keycloak.tokenParsed?.preferred_username && 'hightlight'}`}>
          Created {formatDate(created)}
        </div>
        <div className={`public ${post.username === keycloak.tokenParsed?.preferred_username && 'hightlight'}`}>
          {formatDate(created) !== formatDate(modified) &&
            <>Modified {formatDate(modified)}</>
          }
        </div>
      </div>
    </div>

  )
}

export default PostCard;