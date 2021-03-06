import React, { useContext } from 'react';
import './styles/Header.css'
import { useKeycloak } from '@react-keycloak/web'
import { useNavigate } from 'react-router-dom'
import { BlogContext } from "../App.js";


const Header = () => {
  const { keycloak, initialized } = useKeycloak()
  const blogContext = useContext(BlogContext);
  const navigate = useNavigate()


  const goHome = () => {
    navigate('/')
  }

  const clickHandler = () => {
    if (keycloak.authenticated) {
      goHome()
      keycloak.logout()
    } else {
      keycloak.login()
    }
  }



  return (
    <div className='header'>
      <div className='left-section'>
        <div className='hamburger' onClick={goHome}>
          {/* &#9776; */}
          <img className='svg logout' src='/house-solid.svg' alt='home' />
        </div>
      </div>
      <div className='header-title' onClick={goHome}>
        Blog.js
      </div>

      <div className='logout-wrapper' onClick={clickHandler}>
        {keycloak.authenticated ?
          <>
            <img className='svg logout' src='/arrow-right-from-bracket-solid.svg' alt='logout' />
            <div className='logout-text'>
              {keycloak.tokenParsed.preferred_username}
            </div>
          </> :
          <div className='logout-text login'>
            Login
          </div>
        }
      </div>

    </div>
  )
}

export default Header;