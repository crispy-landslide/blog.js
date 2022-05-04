import React, { useContext } from 'react';
import './styles/Home.css'
import { useKeycloak } from '@react-keycloak/web'
import BlogCard from '../components/BlogCard.js'
import { BlogContext } from "../App.js";


const Home = () => {
  const { keycloak, initialized } = useKeycloak()
  const blogContext = useContext(BlogContext);


  return (
    <div className='home'>

    </div>
  )
}

export default Home;