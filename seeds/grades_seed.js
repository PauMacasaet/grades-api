const grades = require('../inserts/grades');

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('card').del()
    .then(() => {
      // Inserts seed entries
      return knex('card').insert(grades);
    });
};
