import { Request, Response } from 'express';
import * as Yup from 'yup';
import AuthUserService from '../../service/AuthUserService';

class SessionController {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });
      if (!(await schema.isValid(req.body))) {
        throw new Error('validation fail');
      }

      const { email, password } = req.body;
      const authenticateUser = new AuthUserService();
      const response = await authenticateUser.execute({ email, password });

      return res.json(response);
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  }
}
export default new SessionController();
