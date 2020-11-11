import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import Users from '@modules/users/infra/typeorm/entities/Users';

import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  name: string;
  password: string;
  provider?: boolean;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({
    email,
    name,
    password,
    provider,
  }: IRequest): Promise<Users> {
    const checkUser = await this.userRepository.findByEmail(email);
    if (checkUser) {
      throw new Error('email in use');
    }

    const hashedPass = await hash(password, 10);

    const user = await this.userRepository.create({
      email,
      password: hashedPass,
      name,
      provider,
    });

    return user;
  }
}
