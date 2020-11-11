import { Router } from 'express';
import Sessioncontroller from '../controllers/SessionController';

const sessionRouter = Router();

sessionRouter.post('/', Sessioncontroller.store);

export default sessionRouter;
