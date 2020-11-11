import { Router } from 'express';

import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import providerRouter from '@modules/users/infra/http/routes/provider.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/session', sessionRouter);
routes.use('/provider', providerRouter);

export default routes;
