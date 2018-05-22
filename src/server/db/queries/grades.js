const knex = require('../connection');

function getAllGrades() {
    return knex('subject')
    .orderBy('id');
}

function getOneGrades(id) {
    return knex('subject')
    .where({
        id: parseInt(id)
    });
}

function addSubject(subject) {
    return knex('subject')
    .insert(subject)
    .returning('*');
}

function updateSubject(id, subject) {
    return knex('subject')
    .update(subject)
    .where({ id: parseInt(id) })
    .returning('*');
}

function deleteSubject(id) {
    return knex('subject')
    .del()
    .where({ id: parseInt(id) })
    .returning('*');
}

module.exports = {
    getAllGrades,
    getOneGrades,
    addSubject,
    updateSubject,
    deleteSubject
};