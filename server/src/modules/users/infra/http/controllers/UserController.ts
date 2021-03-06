import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';

import UpdateUserService from '@modules/users/services/UpdateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import VerifyService from '@shared/services/VerifyService';
import AvatarService from '@modules/users/services/AvatarService';

class UserController {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      await VerifyService.create(req);

      const { name, email, password, provider = false } = req.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({
        name,
        email,
        password,
        provider,
      });

      return res.json(classToClass(user));
    } catch (err) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { email, oldPassword, password, name } = req.body;
      const updateUser = container.resolve(UpdateUserService);

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
      return res.status(err.statusCode).json({ error: err.message });
    }
  }

  public async avatarFile(req: Request, res: Response): Promise<Response> {
    try {
      const userAvatar = container.resolve(AvatarService);

      const user = await userAvatar.execute({
        userId: req.user.id,
        avatarFilename: req.file.filename,
      });

      return res.json(classToClass(user));
    } catch (err) {
      return res.status(err.statusCode).json({ error: err });
    }
  }
}

export default new UserController();
