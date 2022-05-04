/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: '4d660a58-ed24-4353-8e94-cc6339a4a6db', firstname: 'John', lastname: 'Adams', username: 'user1'},
    {id: '66290d72-12e8-46df-b802-03f344aa38b7', firstname: 'Bob', lastname: 'Smith', username: 'user2'}
  ]);
};
