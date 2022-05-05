/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('posts', table => {
    table.increments('id');
    table.text('title');
    table.text('content');
    table.text('username');
    table.foreign('username').references('users.username');
    table.integer('public');
    table.datetime('created');
    table.datetime('modified');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts')
};
