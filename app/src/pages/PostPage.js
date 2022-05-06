import React, { useState, useContext, useEffect } from 'react';
import './styles/PostPage.css'
import { useKeycloak } from '@react-keycloak/web'
import { BlogContext } from "../App.js";
import { useNavigate, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/prism'
import EditPost from './EditPost'

const formatDate = (date) => {
  if (date) {
    let hours = date.getHours().toString().padStart(2, '0')
    let minutes = date.getMinutes().toString().padStart(2, '0')
    return ` ${date.toDateString()} at ${hours}:${minutes}`
  }
}

const PostPage = () => {
  const { keycloak, initialized } = useKeycloak()
  const blogContext = useContext(BlogContext);
  const navigate = useNavigate();

  const [created, setCreated] = useState()
  const [modified, setModified] = useState()
  const [edit, setEdit] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    let id = Number.parseInt(window.location.pathname.split('/posts/')[1])
    setCreated(new Date(blogContext.currentPost?.created))
    setModified(new Date(blogContext.currentPost?.modified))

    if (keycloak.authenticated) {
      setIsAdmin(keycloak.hasRealmRole('admin'))
    }

    if (initialized && blogContext.currentPost === undefined) {
      let found = false
      if (keycloak.authenticated && blogContext.allPosts) {
        for (let post of blogContext.allPosts) {
          if (post.id === id) {
            blogContext.setCurrentPost(post)
            found = true
            setCreated(new Date(blogContext.currentPost?.created))
            setModified(new Date(blogContext.currentPost?.modified))
          }
        }
      } else if (!keycloak.authenticated && blogContext.publicPosts) {
        for (let post of blogContext.publicPosts) {
          if (post.id === id) {
            blogContext.setCurrentPost(post)
            found = true
            setCreated(new Date(blogContext.currentPost?.created))
            setModified(new Date(blogContext.currentPost?.modified))
          }
        }
      }
      if (!found) {
        navigate('/')
      }
    }

  }, [blogContext.currentPost, blogContext.publicPosts, blogContext.allPosts, keycloak.authenticated])

  const goToUser = () => {
    if (keycloak.authenticated) {
      blogContext.setOtherUserPosts(blogContext.allPosts.filter(allPost => allPost.username === blogContext.currentPost.username))
    } else {
      blogContext.setOtherUserPosts(blogContext.publicPosts.filter(publicPost => publicPost.username === blogContext.currentPost.username))
    }
    navigate(`/user/${blogContext.currentPost.username}`)
  }

  return ( blogContext.currentPost ?
    edit ?
      <div className='edit'>
          <EditPost post={blogContext.currentPost} setEdit={setEdit} />
      </div> :
      <div className='post-page-wrapper'>
        <div className='post-page'>
          <div className='post-page-attributes'>
            <div className={`public attribute ${blogContext.currentPost.username === keycloak.tokenParsed?.preferred_username && 'hightlight'}`}>
              {blogContext.currentPost.public ?
                <><img className='svg' src='/earth-americas-solid.svg' alt=''/>Public</> :
                <div className='private'><img className='svg' src='/lock-solid.svg' alt=''/>Private</div>}
            </div>
          </div>
          <div className='post-page-title'>
            {blogContext.currentPost.title}
          </div>
          <div className='author-edit' >
            <Link to={`/user/${blogContext.currentPost.username}`} className='link' onClick={goToUser}>
              <div className={`user ${blogContext.currentPost.username === keycloak.tokenParsed?.preferred_username && 'hightlight'}`} id='user-link'>
                {blogContext.currentPost.username}
              </div>
            </Link>
            {((keycloak.tokenParsed?.preferred_username === blogContext.currentPost.username || isAdmin) && !blogContext.currentPost.preview) &&
              <div className={`user ${blogContext.currentPost.username === keycloak.tokenParsed?.preferred_username && 'hightlight'}`}>
                <img className='svg logout edit' src='/pencil-solid.svg' alt='edit' onClick={() => setEdit(true)}/>
              </div>
            }
          </div>

          <hr className='separator' />
          <div className='post-page-content'>
            <ReactMarkdown
              children={blogContext.currentPost.content}
              remarkPlugins={[remarkGfm]}
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={dracula}
                      language={match[1]}
                      PreTag="div"
                      showLineNumbers
                      showInlineLineNumbers
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            />
          </div>
          <div className='post-page-attributes'>
            <div className={`public attribute ${blogContext.currentPost.username === keycloak.tokenParsed?.preferred_username && 'hightlight'}`}>
              Created {formatDate(created)}
            </div>
            {formatDate(created) !== formatDate(modified) &&
              <div className={`public attribute ${blogContext.currentPost.username === keycloak.tokenParsed?.preferred_username && 'hightlight'}`}>
                  <>Modified {formatDate(modified)}</>
              </div>
            }
          </div>

        </div>
      </div> : ''
  )
}

export default PostPage;