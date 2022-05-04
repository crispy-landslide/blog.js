import React from 'react';
import './styles/BlogCard.css'
import { useKeycloak } from '@react-keycloak/web'


const BlogCard = () => {
  const { keycloak, initialized } = useKeycloak()


  return (
    <div className='blog-card'>

    </div>
  )
}

export default BlogCard;