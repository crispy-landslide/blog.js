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
router.get('/:uid', keycloak.protect(), async (req, res) => {
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
  let posts = await knex('posts').select('*').where({user_id: token.sub}).catch(err => console.log(err))
  res.status(200).json(posts);
})

// Get all private posts belonging to a user (must be authorized)
router.get('/:uid/private', keycloak.protect(), async (req, res) => {
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
  let posts = await knex('posts').select('*').where({public: 0, user_id: token.sub}).catch(err => console.log(err))
  res.status(200).json(posts);
})

// Get all public posts belonging to a user
router.get('/:uid/public', async (req, res) => {
  let posts = await knex('posts').select('*').where({public: 1, user_id: req.params.uid}).catch(err => console.log(err))
  res.status(200).json(posts);
})


module.exports = router;