import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import Users from '@modules/users/infra/typeorm/entities/Users';

import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId?: string;
  name?: string;
  email?: string;
  oldPassword?: string;
  password?: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({
    userId,
    name,
    password,
    email,
    oldPassword,
  }: IRequest): Promise<Users> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (email && email !== user.email) {
      const checkEmail = await this.userRepository.findByEmail(email);

      if (checkEmail) {
        throw new Error('email in use');
      }
      user.email = email;
    }
    if (name) {
      user.name = name;
    }

    // if (!oldPassword && password) {
    //   throw new Error('You should provide old password');
    // }
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

    this.userRepository.save(user);
    return user;
  }
}
