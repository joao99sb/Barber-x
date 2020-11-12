import { getRepository, Repository } from 'typeorm';

import IUserrepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsers from '@modules/users/dtos/ICreateUserDTO';

import Users from '../entities/Users';

class UsersRepository implements IUserrepository {
  private ormRepository: Repository<Users>;

  constructor() {
    this.ormRepository = getRepository(Users);
  }

  public async findById(id: string): Promise<Users | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }

  public async save(user: Users): Promise<Users> {
    return this.ormRepository.save(user);
  }

  public async create(userData: ICreateUsers): Promise<Users> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async findProvider(id: string): Promise<Users> {
    const provider = await this.ormRepository.findOne({
      where: { id },
    });

    return provider;
  }

  public async findAllProviders(): Promise<Users[]> {
    const provider = await this.ormRepository.find({
      where: { provider: true },
    });

    return provider;
  }
}

export default UsersRepository;
