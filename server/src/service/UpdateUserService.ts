import { getRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import Users from '../app/models/Users';

interface Request {
  userId?: string;
  name?: string;
  email?: string;
  oldPassword?: string;
  password?: string;
}

export default class UpdateUserService {
  public async execute({
    userId,
    name,
    password,
    email,
    oldPassword,
  }: Request): Promise<Users> {
    const userRepo = getRepository(Users);
    const user = await userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }
    if (email && email !== user.email) {
      const checkEmail = await userRepo.findOne({ where: email });
      if (checkEmail) {
        throw new Error('email in use');
      }
    }

    user.name = name;
    user.email = email;

    if (!oldPassword && password) {
      throw new Error('You should provide old password');
    }
    if (oldPassword && password) {
      const checkPassword = await compare(oldPassword, user.password);
      if (oldPassword && !checkPassword) {
        throw new Error('Password does not match');
      }
      if (oldPassword === password) {
        throw new Error('enter a different password than the previous one');
      }

      user.password = await hash(password, 10);
    }
    userRepo.save(user);
    return user;
  }
}
