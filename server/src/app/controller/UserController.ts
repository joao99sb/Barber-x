import { Request, Response } from 'express';
import UpdateUserService from '../../service/UpdateUserService';
import CreateUserService from '../../service/CreateUserService';
import VerifyService from '../../service/VerifyService';

class UserController {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      await VerifyService.create(req.body);

      const { name, email, password, provider = false } = req.body;
      const createuser = new CreateUserService();

      const user = await createuser.execute({
        name,
        email,
        password,
        provider,
      });

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      await VerifyService.update(req.body);

      const { email, oldPassword, password, name } = req.body;
      const updateUser = new UpdateUserService();

      const userId = req.user.id;

      const user = await updateUser.execute({
        userId,
        email,
        oldPassword,
        password,
        name,
      });
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new UserController();
