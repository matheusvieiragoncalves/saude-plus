import express, { Request, Response } from 'express';
import knex from './database/connection';

import itemsController from './controllers/itemsController';
import pointsController from './controllers/pointsController';

// index (find all), show (find one), create, update, delete

const routes = express.Router();

routes.get('/items', itemsController.index);

routes.get('/points/:id', pointsController.show);
routes.get('/points', pointsController.index);

routes.post('/points', pointsController.create);

routes.get('/point_items', async (req: Request, res: Response) => {
  const points = await knex('point_items').select('*');

  return res.status(200).json(points);
});

export default routes;

/** Futuros Patterns a serem impemetados:
 * Service Pattern
 * Repository Pattern (Data Mapper)
 **/
