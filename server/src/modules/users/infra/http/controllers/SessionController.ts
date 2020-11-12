import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';

import AuthUserService from '@modules/users/services/AuthUserService';
import VerifyService from '@shared/services/VerifyService';

class SessionController {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      await VerifyService.session(req);

      const { email, password } = req.body;
      const authenticateUser = container.resolve(AuthUserService);
      const response = await authenticateUser.execute({ email, password });

      return res.json(classToClass(response));
    } catch (err) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
}
export default new SessionController();
