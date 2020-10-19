import { Request, Response } from 'express';
import CreateUserService from '../../service/CreateUserService';

class UserController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { name, email, password, provider = false } = req.body;
    const createuser = new CreateUserService();

    const user = await createuser.execute({
      name,
      email,
      password,
      provider,
    });

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    return res.json({ oi: true });
  }
}

export default new UserController();
