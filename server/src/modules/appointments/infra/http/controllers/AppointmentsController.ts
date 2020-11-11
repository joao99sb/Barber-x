import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

class AppointmentsContoller {
  public async store(req: Request, res: Response): Promise<Response> {
    return res.json({ okay: true });
  }
}

export default new AppointmentsContoller();
