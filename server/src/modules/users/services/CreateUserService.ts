import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Users from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
  email: string;
  name: string;
  password: string;
  provider?: boolean;
}
export default class CreateUser {
  public async execute({
    email,
    name,
    password,
    provider,
  }: IRequest): Promise<Users> {
    const userRepo = getRepository(Users);
    const checkUser = await userRepo.findOne({ where: { email } });
    if (checkUser) {
      throw new Error('email in use');
    }

    const hashedPass = await hash(password, 10);

    const user = userRepo.create({
      email,
      password: hashedPass,
      name,
      provider,
    });

    await userRepo.save(user);

    return user;
  }
}