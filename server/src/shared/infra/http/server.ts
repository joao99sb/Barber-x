import 'reflect-metadata';

import app from './app';
import '@shared/infra/typeorm';
import '@shared/container';

const port = 3333;
app.listen(port, () => console.log(`listen on ${port}`)); // eslint-disable-line
