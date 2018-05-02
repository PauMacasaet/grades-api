const knex = require('../connection');

function getAllGrades() {
    return knex('card');
}

function getOneGrades(id) {
    return knex('card')
    .where({
        id: parseInt(id)
    });
}

module.exports = {
    getAllGrades,
    getOneGrades
};