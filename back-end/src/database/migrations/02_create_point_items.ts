import Knex from 'knex';

//Executa alguma função no banco
export async function up(knex: Knex) {
  return knex.schema.createTable('point_items', (table) => {
    table.increments('id').primary();
    table.integer('point_id').notNullable().references('id').inTable('points');
    table.integer('item_id').notNullable().references('id').inTable('items');
  });
}

// Reverte o que foi feito no método UP
export async function down(knex: Knex) {
  return knex.schema.dropTable('point_items');
}
