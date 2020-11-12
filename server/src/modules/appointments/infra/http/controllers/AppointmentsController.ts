import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentsService';

class AppointmentsContoller {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const providerId = req.user.id;

      const { date } = req.body;

      const createAppointments = container.resolve(CreateAppointmentsService);
      await createAppointments.execute({
        providerId,
        date,
      });

      return res.json(createAppointments);
    } catch (err) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {}
}

export default new AppointmentsContoller();
