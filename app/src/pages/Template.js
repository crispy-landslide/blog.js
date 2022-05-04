import React, { useContext } from 'react';
import './styles/Template.css'
import { useKeycloak } from '@react-keycloak/web'
import { BlogContext } from "../App.js";


const Template = () => {
  const { keycloak, initialized } = useKeycloak()
  const blogContext = useContext(BlogContext);


  return (
    <div className='template'>

    </div>
  )
}

export default Template;