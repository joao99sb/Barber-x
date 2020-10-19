import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Users from '../app/models/Users';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

class AuthUserService {
  public async execute({
    email,
    password,
  }: Request): Promise<{ user: Users; token: string }> {
    const userRepo = getRepository(Users);
    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
      throw new Error('email/password fail');
    }
    const passwordChecked = compare(password, user.password);
    if (!passwordChecked) {
      throw new Error('email/password fail');
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
    delete user.password;
    return {
      user,
      token,
    };
  }
}
export default AuthUserService;
