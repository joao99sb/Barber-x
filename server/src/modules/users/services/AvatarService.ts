import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/uploads';
import Users from '../infra/typeorm/entities/Users';

interface IRequest {
  userId: string;
  avatarFilename: string;
}

export default class AvatarService {
  public async execute({ userId, avatarFilename }: IRequest): Promise<Users> {
    const userRepo = getRepository(Users);

    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Only authenticated users can change avatar');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarCheck = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarCheck) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;
    await userRepo.save(user);
    return user;
  }
}
