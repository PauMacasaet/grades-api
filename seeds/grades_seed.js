const grades = require('../inserts/grades');

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('subject').del()
    .then(() => {
      // Inserts seed entries
      return knex('subject').insert(grades);
    });
};
