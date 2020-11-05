import express, { Express } from 'express';
import routes from '../../../modules/users/infra/http/controllers/routes';

class App {
  server: Express;

  constructor() {
    this.server = express();
    this.middlewares();
    this.rotes();
  }

  private rotes(): void {
    this.server.use(routes);
  }

  private middlewares(): void {
    this.server.use(express.json());
  }
}

export default new App().server;
