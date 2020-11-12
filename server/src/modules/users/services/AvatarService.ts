import { inject, injectable } from 'tsyringe';

import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/uploads';

import AppError from '@shared/errors/AppError';
import Users from '@modules/users/infra/typeorm/entities/Users';

import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  avatarFilename: string;
}

@injectable()
export default class AvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({ userId, avatarFilename }: IRequest): Promise<Users> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarCheck = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarCheck) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;
    await this.userRepository.save(user);
    return user;
  }
}
