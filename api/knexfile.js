// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const connection = process.env.DATABASE_URL ??
{
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT
}

module.exports = {

  development: {
    client: 'postgresql',
    connection: connection
  },

  production: {
    client: 'postgresql',
    connection: connection
  }

};
