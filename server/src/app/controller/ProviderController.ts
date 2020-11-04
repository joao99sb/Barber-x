import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { classToClass } from 'class-transformer';
import Users from '@modules/users/infra/typeorm/entities/Users';

class ProviderController {
  public async index(req: Request, res: Response): Promise<Response> {
    const userRepo = getRepository(Users);
    const providers = await userRepo.find({
      where: { provider: true },
    });

    return res.json(classToClass(providers));
  }
}
export default new ProviderController();
