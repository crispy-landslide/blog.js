const express = require('express');
const knexImport = require('knex');
const knexfile = require('../../knexfile.js');
const initKeycloak = require('../keycloak-config.js');
const keycloak = initKeycloak();


const router = express.Router();
const knex = knexImport(knexfile[process.env.NODE_ENV || 'development']);


//-------------------------------------------------------------------------------------------
// GET Routes
//-------------------------------------------------------------------------------------------

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


//-------------------------------------------------------------------------------------------
// POST Routes
//-------------------------------------------------------------------------------------------

// Create a new post (must be authorized)
router.post('/', keycloak.protect(), async (req, res) => {
  const token = req.kauth.grant.access_token.content;
  if (req.body.title !== undefined &&
      req.body.content !== undefined &&
      req.body.username !== undefined &&
      req.body.public !== undefined &&
      req.body.created !== undefined &&
      req.body.modified!== undefined) {

    if (token.preferred_username === req.body.username) {
      let newPost = {
        title: req.body.title,
        content: req.body.content,
        username: token.preferred_username,
        public: req.body.public,
        created: req.body.created,
        modified: req.body.modified
      };

      let createdPost = await knex('posts').insert(newPost).returning('*').catch(err => console.log(err));
      res.status(201).send(createdPost[0]);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400)
  }
})


//-------------------------------------------------------------------------------------------
// PATCH Routes
//-------------------------------------------------------------------------------------------

// Edit a post (must be authorized)
router.patch('/:post_id', keycloak.protect(), async (req, res) => {
  const token = req.kauth.grant.access_token.content;
  if ((req.body.title !== undefined ||
      req.body.content !== undefined ||
      req.body.public !== undefined) &&
      req.body.username !== undefined &&
      req.body.modified!== undefined) {

    if (token.preferred_username === req.body.username) {
      let updatedPost = {};
      (req.body.title !== undefined) && (updatedPost.title = req.body.title);
      (req.body.content !== undefined) && (updatedPost.content = req.body.content);
      (req.body.public !== undefined) && (updatedPost.public = req.body.public);
      updatedPost.modified = req.body.modified;

      let confirmUpdate = await knex('posts')
        .where({id: req.params.post_id, username: token.preferred_username})
        .update(updatedPost)
        .returning('*')
        .catch(err => console.log(err))
      res.status(200).send(confirmUpdate[0]);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
})

//-------------------------------------------------------------------------------------------
// DELETE Routes
//-------------------------------------------------------------------------------------------

// Delete a post (must be authorized)
router.delete('/:post_id', keycloak.protect(), async (req, res) => {
  const token = req.kauth.grant.access_token.content;

  let deletedPost = await knex('posts').select('*')
    .where({id: req.params.post_id, username: token.preferred_username})
    .catch(err => console.log(err))

  if (deletedPost?.length > 0) {
    let confirmDelete = await knex('posts')
      .where({id: req.params.post_id, username: token.preferred_username})
      .delete()
      .returning('*')
      .catch(err => console.log(err))

    res.status(200).send(deletedPost[0]);
  } else {
    res.sendStatus(400)
  }
})


module.exports = router;