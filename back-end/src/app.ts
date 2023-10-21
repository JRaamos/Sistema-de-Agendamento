import express from 'express';
import cors from 'cors';
import routerRegistre from './routers/registres.routers';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(cors());
app.use(routerRegistre);

export default app;