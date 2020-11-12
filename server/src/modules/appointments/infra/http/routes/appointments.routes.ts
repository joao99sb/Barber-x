import { Router } from 'express';
import authenticated from '@modules/users/infra/http/middleware/auth';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();

appointmentsRouter.use(authenticated);

appointmentsRouter.post('/', AppointmentsController.create);

export default appointmentsRouter;
