import { inject, injectable } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUsersRepository';

import Appointment from '../infra/typeorm/entities/Appointmests';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  providerId: string;
  date: Date;
}

@injectable()
class CreateAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({ date, providerId }: IRequest): Promise<void> {
    const isProvider = await this.userRepository.findProvider(providerId);

    if (!isProvider) {
      console.log('oi');
      throw new Error('you can only create a appointment with providers');
    }
  }
}

export default CreateAppointmentsService;
