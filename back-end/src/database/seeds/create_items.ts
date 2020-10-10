import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Corrida e Caminhada', image: 'corrida.svg' },
    { title: 'Ciclismo', image: 'ciclismo.svg' },
    { title: 'Natação', image: 'natacao.svg' },
    { title: 'Patinação', image: 'patins.svg' },
    { title: 'Piquenique no Parque', image: 'piquenique.svg' }
  ]);
}
