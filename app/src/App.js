import './App.css';
import React, { useState, createContext } from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import keycloak from './keycloak'
import Header from './components/Header'
import Home from './pages/Home'
import UserPosts from './pages/UserPosts'
import PostPage from './pages/PostPage'
import CreatePost from './pages/CreatePost'

const initOptions = {
  onLoad: 'check-sso',
  checkLoginIframe: false,
}

export const BlogContext = createContext(null)

function App() {

  const [publicPosts, setPublicPosts] = useState()
  const [privatePosts, setPrivatePosts] = useState()
  const [userPosts, setUserPosts] = useState()
  const [allPosts, setAllPosts] = useState()
  const [currentPost, setCurrentPost] = useState()
  const [otherUserPosts, setOtherUserPosts] = useState()
  const [serverURL] = useState(process.env.REACT_APP_SERVER_URL || 'http://localhost:3001')

  const sortPosts = (posts) => {
    let postCreatedMillis = posts.map(post => Number.parseInt((new Date(post.created)).getTime())).sort(function(a, b){return b-a})
    let postIndices = postCreatedMillis.map(postMillis => posts.findIndex(post => Number.parseInt((new Date(post.created)).getTime()) === postMillis))
    let sortedPosts = postIndices.map(ix => posts[ix])
    return sortedPosts
  }

  const getPublicPosts = async (request) => {
    await fetch(`${serverURL}/api/posts`, request)
      .then(response => response.json())
      .then(posts => {
        posts = sortPosts(posts)
        setPublicPosts(posts)
      })
      .catch(err => console.log(err))
  }

  const getPrivatePosts = async (request) => {
    let uid = keycloak.tokenParsed.sub
    await fetch(`${serverURL}/api/posts/user/${uid}/private`, request)
      .then(response => response.json())
      .then(posts => {
        posts = sortPosts(posts)
        setPrivatePosts(posts)
      })
      .catch(err => console.log(err))
  }

  const getUserPosts = async (request) => {
    let uid = keycloak.tokenParsed.sub
    await fetch(`${serverURL}/api/posts/user/${uid}`, request)
      .then(response => response.json())
      .then(posts => {
        posts = sortPosts(posts)
        setUserPosts(posts)
      })
      .catch(err => console.log(err))
  }

  const getAllPosts = async (request) => {
    await fetch(`${serverURL}/api/posts/all`, request)
      .then(response => response.json())
      .then(posts => {
        posts = sortPosts(posts)
        setAllPosts(posts)
      })
      .catch(err => console.log(err))
  }

  const eventHandler = (event, error) => {
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keycloak.token}`
      }
    }
    if (event === 'onReady') {
      getPublicPosts(request);
    }
    if (event === 'onAuthSuccess') {
      getPrivatePosts(request);
      getUserPosts(request);
      getAllPosts(request);
    }
  }

  const getPosts = async () => {
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keycloak.token}`
      }
    }
    await getPublicPosts(request);
    if (keycloak.authenticated) {
      await getPrivatePosts(request);
      await getUserPosts(request);
      await getAllPosts(request);
    }
  }

  const blogContextValues = {
    keycloak,
    serverURL,
    publicPosts,
    privatePosts,
    userPosts,
    allPosts,
    currentPost, setCurrentPost,
    otherUserPosts, setOtherUserPosts,
    getPosts
  }

  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions} onEvent={eventHandler}>
      <div className="App">
        <BlogContext.Provider value={blogContextValues}>
          <Router>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/posts' element={<Home />} />
              <Route path='/posts/add' element={<CreatePost />} />
              <Route path='/posts/:id' element={<PostPage />} />
              <Route path='/user/:username' element={<UserPosts />} />
            </Routes>
          </Router>
        </BlogContext.Provider>
      </div>
    </ReactKeycloakProvider>

  );
}

export default App;
