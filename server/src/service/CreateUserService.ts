import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Users from '../app/models/Users';

interface Request {
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
  }: Request): Promise<Users> {
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
    delete user.password;
    return user;
  }
}
