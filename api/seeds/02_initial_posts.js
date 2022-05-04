/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {title: 'Post 1', content: 'This is Post 1', user_id: '4d660a58-ed24-4353-8e94-cc6339a4a6db', public: 1},
    {title: 'Post 2', content: 'This is Post 2', user_id: '4d660a58-ed24-4353-8e94-cc6339a4a6db', public: 0},
    {title: 'Post 3', content: 'This is Post 3', user_id: '4d660a58-ed24-4353-8e94-cc6339a4a6db', public: 1},
    {title: 'Post 4', content: 'This is Post 4', user_id: '66290d72-12e8-46df-b802-03f344aa38b7', public: 1},
    {title: 'Post 5', content: 'This is Post 5', user_id: '66290d72-12e8-46df-b802-03f344aa38b7', public: 0},
    {title: 'Post 6', content: 'This is Post 6', user_id: '66290d72-12e8-46df-b802-03f344aa38b7', public: 1},
  ]);
};