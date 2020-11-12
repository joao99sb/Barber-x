import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import FindAllProvidersService from '@modules/users/services/FindAllProvidersService';

class ProviderController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const providersRepo = container.resolve(FindAllProvidersService);
      const providers = await providersRepo.execute();

      return res.json(classToClass(providers));
    } catch (err) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
}
export default new ProviderController();
