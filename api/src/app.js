const express = require('express')
const cors = require('cors')
const initKeycloak = require('./keycloak-config.js')
const app = express()
const posts = require('./routes/posts.js')


const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV || 'development']);

process.env.NODE_ENV === 'development' && (async () => {
  try {
    console.log("Rolling back database . . .")
    await knex.migrate.rollback()
    console.log("Migrating database to latest . . .")
    await knex.migrate.latest()
    console.log("Running seeds . . .")
    await knex.seed.run()
    console.log("Done setting up database.")
  } catch (err) {
    console.log(err)
  }
})();

const keycloak = initKeycloak();
app.use(keycloak.middleware());

app.use(express.json())
app.use(cors())
app.options('*', cors());

app.use('/api/posts', posts);

module.exports = app;
