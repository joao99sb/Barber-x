import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';

import Users from '../infra/typeorm/entities/Users';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({
    email,
    password,
  }: IRequest): Promise<{ user: Users; token: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('email/password fail');
    }

    const passwordChecked = await compare(password, user.password);

    if (!passwordChecked) {
      throw new Error('email/password fail');
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
export default AuthUserService;
