const express = require('express')
const app = express()

const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV || 'development']);

(async () => {
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

var cors = require('cors')

app.use(express.json())
app.use(cors())
app.options('*', cors());

app.get('/api', async (req, res) => {

  let message = "The API is working correctly."

//   knex.select('*').from('users')
//   .then(data => {
//     res.status(200).send({
//       message: process.env.CUSTOM_MESSAGE || message,
//       users: data
//     })
//   })
//   .catch(err => res.status(400).send({error: err}))
  res.send(process.env.CUSTOM_MESSAGE || message)

})

module.exports = app; 
