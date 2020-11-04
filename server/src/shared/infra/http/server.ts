import 'reflect-metadata';

import app from './app';
import '../database';

const port = 3333;
app.listen(port, () => console.log(`listen on ${port}`)); // eslint-disable-line
