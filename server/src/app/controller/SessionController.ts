import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import AuthUserService from '@modules/users/services/AuthUserService';
import VerifyService from '@shared/services/VerifyService';

class SessionController {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      await VerifyService.session(req);

      const { email, password } = req.body;
      const authenticateUser = new AuthUserService();
      const response = await authenticateUser.execute({ email, password });

      return res.json(classToClass(response));
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  }
}
export default new SessionController();
