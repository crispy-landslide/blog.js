import React from 'react';
import './styles/Header.css'
import { useKeycloak } from '@react-keycloak/web'


const Header = () => {
  const { keycloak, initialized } = useKeycloak()

  const clickHandler = () => {
    if (keycloak.authenticated) {
      keycloak.logout()
    } else {
      keycloak.login()
    }
  }

  return (
    <div className='header'>
      <div className='left-section'>
        <div className='hamburger'>
          &#9776;
        </div>
      </div>
      <div className='header-title'>
        Blog.js
      </div>

        <div className='logout-wrapper' onClick={clickHandler}>
          {keycloak.authenticated ?
            <>
              <img className='logout' src='/arrow-right-from-bracket-solid.svg' alt='logout' />
              <div className='logout-text'>
                Logout
              </div>
            </> :
            <div className='logout-text'>
              Login
            </div>
        }
        </div>

    </div>
  )
}

export default Header;