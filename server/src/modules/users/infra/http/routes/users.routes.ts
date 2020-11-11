import { Router } from 'express';

import multer from 'multer';
import multerConfig from '@config/uploads';

import UserController from '../controllers/UserController';
import authenticated from '../middleware/auth';

const uploads = multer(multerConfig);

const userRoute = Router();

userRoute.post('/', UserController.store);

userRoute.use(authenticated);

userRoute.put('/', UserController.update);
userRoute.patch('/avatar', uploads.single('avatar'), UserController.avatarFile);

export default userRoute;
