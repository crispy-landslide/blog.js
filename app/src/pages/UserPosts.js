import React, { useState, useEffect, useContext } from 'react';
import './styles/UserPosts.css'
import { useKeycloak } from '@react-keycloak/web'
import PostCard from '../components/PostCard.js'
import { BlogContext } from "../App.js";


const UserPosts = () => {
  const { keycloak, initialized } = useKeycloak()
  const blogContext = useContext(BlogContext);
  // const [myPosts, setMyPosts] = useState(false)
  const [posts, setPosts] = useState()
  const [user, setUser] = useState('my-posts')

  useEffect(() => {
    let username = window.location.pathname.split('/').filter(item => item)[1]
    setUser(username)
    if (blogContext.otherUserPosts) {
      setPosts(blogContext.otherUserPosts)
    } else if (blogContext.allPosts && !blogContext.otherUserPosts) {
      let matchingPosts = blogContext.allPosts.filter(allPost => allPost.username === username)
      blogContext.setOtherUserPosts(matchingPosts)
      setPosts(matchingPosts)
    }

  }, [blogContext.publicPosts, blogContext.userPosts, blogContext.allPosts])


  return ( posts ?
    <div className='home'>
      <>
        <h1 className='page-title'>{user && `Posts by ${user}`}</h1>
        {posts.length > 0 ?
        <div className='posts'>
          {posts.map(post => <PostCard key={post.id} post={post}/>)}
        </div>:
        <div className='no-posts'>
          {`No posts found for ${user}`}
        </div>
      }
      </>
    </div> : ''
  )
}

export default UserPosts;