import Knex from 'knex';

//Executa alguma função no banco
export async function up(knex: Knex) {
  return knex.schema.createTable('points', (table) => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
    table.integer('likes');
    table.integer('dislikes');
  });
}

// Reverte o que foi feito no método UP
export async function down(knex: Knex) {
  return knex.schema.dropTable('points');
}
