import Users from 'app/models/Users';
import { Router } from 'express';
import { getRepository } from 'typeorm';

const routes = Router();

routes.get('/', async (req, res) => {
  const userRepo = await getRepository(Users);
  const user = userRepo.create()
});

export default routes;
