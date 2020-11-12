import { injectable, inject } from 'tsyringe';
import Users from '../infra/typeorm/entities/Users';
import IUserRepository from '../repositories/IUsersRepository';

@injectable()
export default class FindAllProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(providerId: string): Promise<Users> {
    const providers = await this.userRepository.findProvider(providerId);
    return providers;
  }
}
