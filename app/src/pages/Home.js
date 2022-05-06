import React, { useState, useEffect, useContext } from 'react';
import './styles/Home.css'
import { useKeycloak } from '@react-keycloak/web'
import PostCard from '../components/PostCard.js'
import AddCard from '../components/AddCard.js'
import { BlogContext } from "../App.js";


const Home = () => {
  const { keycloak, initialized } = useKeycloak()
  const blogContext = useContext(BlogContext);
  // const [myPosts, setMyPosts] = useState(false)
  const [posts, setPosts] = useState()
  const [active, setActive] = useState('my-posts')

  useEffect(() => {
    if (keycloak.authenticated) {
      setPosts(blogContext.userPosts)
    } else {
      setPosts(blogContext.publicPosts)
    }

  }, [keycloak.authenticated, blogContext.publicPosts, blogContext.userPosts])

  const onFilterChange = (newPosts, filter) => {
    setPosts(newPosts)
    setActive(filter)
  }


  return ( posts ?
    <div className='home'>
      <>
        <h1 className='page-title'>Home</h1>
        <div>
          {keycloak.authenticated ?
            <div className='filter-buttons'>
              <button
                className={`button options ${active === 'all-posts' ? 'active': ''}`}
                onClick={() => onFilterChange(blogContext.allPosts, 'all-posts')}>
                  All Posts
              </button>
              <button
                className={`button options ${active === 'all-public' ? 'active': ''}`}
                onClick={() => onFilterChange(blogContext.publicPosts, 'all-public')}>
                  All Public Posts
              </button>
              <button
                className={`button options ${active === 'my-posts' ? 'active': ''}`}
                onClick={() => onFilterChange(blogContext.userPosts, 'my-posts')}>
                  My Posts
              </button>
              <button
                className={`button options ${active === 'my-private' ? 'active': ''}`}
                onClick={() => onFilterChange(blogContext.privatePosts, 'my-private')}>
                  My Private Posts
              </button>
            </div> : ''
          }
        </div>
        {posts.length > 0 ?
        <div className='posts'>
          {keycloak.authenticated && <AddCard/>}
          {posts.map(post => <PostCard key={post.id} post={post}/>)}
        </div>:
        <div className='no-posts'>
          No Posts Found
          <div className='posts'>
            {keycloak.authenticated && <AddCard/>}
          </div>
        </div>
      }
      </>
    </div> : ''
  )
}

export default Home;