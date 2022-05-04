const express = require('express');
const knexImport = require('knex');
const knexfile = require('../../knexfile.js');
const initKeycloak = require('../keycloak-config.js');
const keycloak = initKeycloak();


const router = express.Router();
const knex = knexImport(knexfile[process.env.NODE_ENV || 'development']);

// Get all public posts
router.get('/', async (req, res) => {
  let posts = await knex('posts').select('*').where({public: 1}).catch(err => console.log(err))
  res.status(200).json(posts);
})

// Get all posts belonging to a user (must be authorized)
router.get('/user/:uid', keycloak.protect(), async (req, res) => {
  const token = req.kauth.grant.access_token.content;
  let user = await knex('users').select('*').where({id: token.sub}).catch(err => console.log(err))

  if (user.length === 0) {
    let newUser = {
      id: token.sub,
      firstname: token.given_name,
      lastname: token.family_name,
      username: token.preferred_username
    }
    await knex('users').insert(newUser)
      .catch(err => console.log(err))
  }
  let posts = await knex('posts').select('*').where({username: token.preferred_username}).catch(err => console.log(err))
  res.status(200).json(posts);
})

// Get all private posts belonging to a user (must be authorized)
router.get('/user/:uid/private', keycloak.protect(), async (req, res) => {
  const token = req.kauth.grant.access_token.content;
  let user = await knex('users').select('*').where({id: token.sub}).catch(err => console.log(err))

  if (user.length === 0) {
    let newUser = {
      id: token.sub,
      firstname: token.given_name,
      lastname: token.family_name,
      username: token.preferred_username
    }
    await knex('users').insert(newUser)
      .catch(err => console.log(err))
  }
  let posts = await knex('posts').select('*').where({public: 0, username: token.preferred_username}).catch(err => console.log(err))
  res.status(200).json(posts);
})

// Get all private posts belonging to a user (must be authorized)
router.get('/all', keycloak.protect(), async (req, res) => {
  const token = req.kauth.grant.access_token.content;
  let user = await knex('users').select('*').where({id: token.sub}).catch(err => console.log(err))

  if (user.length === 0) {
    let newUser = {
      id: token.sub,
      firstname: token.given_name,
      lastname: token.family_name,
      username: token.preferred_username
    }
    await knex('users').insert(newUser)
      .catch(err => console.log(err))
  }
  let publicPosts = await knex('posts').select('*').where({public: 1}).catch(err => console.log(err))
  let privatePosts = await knex('posts').select('*').where({public: 0, username: token.preferred_username}).catch(err => console.log(err))
  let posts = publicPosts.concat(privatePosts)
  res.status(200).json(posts);
})



// Get all public posts belonging to a user
router.get('/user/:username/public', async (req, res) => {
  let posts = await knex('posts').select('*').where({public: 1, username: req.params.username}).catch(err => console.log(err))
  res.status(200).json(posts);
})


module.exports = router;