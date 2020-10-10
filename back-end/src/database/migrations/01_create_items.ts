import Knex from 'knex';

//Executa alguma função no banco
export async function up(knex: Knex) {
  return knex.schema.createTable('items', (table) => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
  });
}

// Reverte o que foi feito no método UP
export async function down(knex: Knex) {
  return knex.schema.dropTable('items');
}
