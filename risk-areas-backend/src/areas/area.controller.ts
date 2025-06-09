import { Request, Response } from 'express';
import { areaService } from './areas.service';

class AreaController {
  create(req: Request, res: Response) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'Nome e e-mail são obrigatórios.' });
      }

      const newUser = areaService.create({ name });
      return res.status(201).json(newUser);

    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  findAll(req: Request, res: Response) {
    try {
      const allUsers = areaService.findAll();
      return res.status(200).json(allUsers);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const areaController = new AreaController();