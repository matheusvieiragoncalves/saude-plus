import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
  async index(req: Request, res: Response) {
    const items = await knex('items').select('*');

    const serializedItems = items.map((item) => ({
      id: item.id,
      name: item.title,
      image_url: `http://10.0.2.2:3333/uploads/${item.image}`
    }));

    return res.status(200).json(serializedItems);
  }
}

export default new ItemsController();
