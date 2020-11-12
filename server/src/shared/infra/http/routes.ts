import { Router } from 'express';

import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import providerRouter from '@modules/users/infra/http/routes/provider.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/session', sessionRouter);
routes.use('/provider', providerRouter);
routes.use('/appointments', appointmentsRouter);

export default routes;
