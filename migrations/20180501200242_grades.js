
exports.up = function(knex, Promise) {
    return knex.schema.createTable('card', (table) => {
        table.increments('id').primary();
        table.string('name').notNull();
        table.enu('math', [
            'A', 'B+', 'B', 'C+', 'C', 'D', 'F'
        ]).notNull();
        table.enu('science', [
            'A', 'B+', 'B', 'C+', 'C', 'D', 'F'
        ]).notNull();
        table.enu('english', [
            'A', 'B+', 'B', 'C+', 'C', 'D', 'F'
        ]).notNull();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('card');
};
