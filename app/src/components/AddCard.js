import React, {useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/PostCard.css'
import { useKeycloak } from '@react-keycloak/web'
import { BlogContext } from "../App.js";


const AddCard = () => {
  const { keycloak, initialized } = useKeycloak()
  const blogContext = useContext(BlogContext);
  const [preview, setPreview] = useState()
  const [shortTitle, setShortTitle] = useState()
  const navigate = useNavigate()

  const openPost = () => {
    navigate(`/posts/add`)
  }

  return (
    <div className='add-card-wrapper'>
      <div key='add-card' className='post-card add-card' onClick={openPost}>
          +
      </div>
    </div>

  )
}

export default AddCard;