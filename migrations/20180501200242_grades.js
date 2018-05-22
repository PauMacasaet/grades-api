
exports.up = function(knex, Promise) {
    return knex.schema.createTable('subject', (table) => {
        table.increments('id').primary();
        table.string('course').notNull();
        table.enu('letter_grade', [
            'A', 'B+', 'B', 'C+', 'C', 'D', 'F'
        ]).notNull();
        table.enu('units', [
            1,2,3,5,6
        ]).notNull();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('subject');
};
