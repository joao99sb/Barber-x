import { Router } from 'express';
import ProviderController from '@modules/users/infra/http/controllers/ProviderController';

const providerRouter = Router();

providerRouter.get('/', ProviderController.index);

export default providerRouter;
