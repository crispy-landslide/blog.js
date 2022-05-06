/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 'abb405cf-c27a-4206-932a-9e6615a938b1', firstname: 'John', lastname: 'Adams', username: 'user1'},
    {id: '06ba2807-d99d-4920-a15a-5ca694135e36', firstname: 'Bob', lastname: 'Smith', username: 'user2'}
  ]);
};
