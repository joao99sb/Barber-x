import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import UpdateUserService from '../../service/UpdateUserService';
import CreateUserService from '../../service/CreateUserService';
import VerifyService from '../../service/VerifyService';
import AvatarService from '../../service/AvatarService';

class UserController {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      await VerifyService.create(req);

      const { name, email, password, provider = false } = req.body;
      const createuser = new CreateUserService();

      const user = await createuser.execute({
        name,
        email,
        password,
        provider,
      });

      return res.json(classToClass(user));
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      await VerifyService.update(req);

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
      return res.json(classToClass(user));
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  public async avatarFile(req: Request, res: Response): Promise<Response> {
    try {
      const userAvatar = new AvatarService();

      const user = await userAvatar.execute({
        userId: req.user.id,
        avatarFilename: req.file.filename,
      });

      return res.json(classToClass(user));
    } catch (err) {
      return res.json({ error: err });
    }
  }
}

export default new UserController();
