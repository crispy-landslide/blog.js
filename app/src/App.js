import './App.css';
import React, { useState, createContext } from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import keycloak from './keycloak'
import Header from './components/Header'
import Home from './pages/Home'

const initOptions = {
  onLoad: 'check-sso',
  checkLoginIframe: false,
}

export const BlogContext = createContext(null)

function App() {

  const [publicPosts, setPublicPosts] = useState()
  const [privatePosts, setPrivatePosts] = useState()
  const [serverURL] = useState(process.env.REACT_APP_SERVER_URL || 'http://localhost:3001')

  const getPublicPosts = async () => {
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keycloak.token}`
      }
    }
    await fetch(`${serverURL}/api/posts`, request)
      .then(response => response.json())
      .then(posts => setPublicPosts(posts))
      .catch(err => console.log(err))
  }

  const getPrivatePosts = async () => {
    let uid = keycloak.tokenParsed.sub
    console.log(keycloak)
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keycloak.token}`
      }
    }
    await fetch(`${serverURL}/api/posts/${uid}/private`, request)
      .then(response => response.json())
      .then(posts => setPrivatePosts(posts))
      .catch(err => console.log(err))
  }

  const eventHandler = (event, error) => {
    if (event === 'onReady') {
      console.log("Ready")
      getPublicPosts();
    }
    if (event === 'onAuthSuccess') {
      console.log("Authorized")
      getPrivatePosts();
    }
  }

  console.log("Public Posts: ", publicPosts)
  console.log("Private Posts: ", privatePosts)

  const blogContextValues = {
    keycloak,
    serverURL,
    publicPosts, getPublicPosts,
    privatePosts, getPrivatePosts
  }

  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions} onEvent={eventHandler}>
      <div className="App">
        <BlogContext.Provider value={blogContextValues}>
          <Router>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </Router>
        </BlogContext.Provider>
      </div>
    </ReactKeycloakProvider>

  );
}

export default App;
