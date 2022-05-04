import React, { useContext, useEffect } from 'react';
import './styles/PostPage.css'
import { useKeycloak } from '@react-keycloak/web'
import { BlogContext } from "../App.js";
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


const PostPage = ({ add }) => {
  const { keycloak, initialized } = useKeycloak()
  const blogContext = useContext(BlogContext);
  const navigate = useNavigate();

  useEffect(() => {
    let id = Number.parseInt(window.location.pathname.split('/posts/')[1])

    if (initialized && !add && blogContext.currentPost === undefined) {
      let found = false
      if (keycloak.authenticated && blogContext.allPosts) {
        for (let post of blogContext.allPosts) {
          if (post.id === id) {
            blogContext.setCurrentPost(post)
            found = true
          }
        }
      } else if (!keycloak.authenticated && blogContext.publicPosts) {
        for (let post of blogContext.publicPosts) {
          if (post.id === id) {
            blogContext.setCurrentPost(post)
            found = true
          }
        }
      }
      if (!found) {
        navigate('/')
      }
    }

  }, [blogContext.currentPost, blogContext.publicPosts, blogContext.allPosts])


  return ( blogContext.currentPost ?
    <div className='post-page-wrapper'>
      <div className='post-page-attributes'>
        <div className={`public ${blogContext.currentPost.username === keycloak.tokenParsed?.preferred_username && 'hightlight'}`}>
          {blogContext.currentPost.public ?
            <><img className='svg' src='/earth-americas-solid.svg' alt=''/>Public</> :
            <><img className='svg' src='/lock-solid.svg' alt=''/>Private</>}
        </div>
        <div className={`user ${blogContext.currentPost.username === keycloak.tokenParsed?.preferred_username && 'hightlight'}`}>
          {blogContext.currentPost.username}
        </div>
      </div>
      <div className='post-page'>
        <div className='post-page-title'>
          {blogContext.currentPost.title}
        </div>
        <div className='post-page-content'>
          <ReactMarkdown children={blogContext.currentPost.content} remarkPlugins={[remarkGfm]} />
        </div>
      </div>
    </div>
     : ''
  )
}

export default PostPage;