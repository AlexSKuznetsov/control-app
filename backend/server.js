import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// config
import { BASE_URL, PORT, ENV } from './config.js';

// camunda users seed
import seed from './seed.js';

// routes
import processRoutes from './routes/process.js';
import userRoutes from './routes/users.js';

const app = express();

if (!BASE_URL) {
  throw new Error('Camunda api url not found!');
}

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/process', processRoutes);
app.use('/users', userRoutes);

app.get('/', (_, res) => {
  res.send('working');
});

// seeding Camunda Engine with 3 users
seed();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
  console.log('Current env', ENV);
});
