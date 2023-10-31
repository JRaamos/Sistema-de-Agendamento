import express from 'express';
import cors from 'cors';
import routerRegistre from './routers/registres.routers';
import routerSchedules from './routers/schedules.router';
import routerCancellation from './routers/cancellation.routers';
import routerLogin from './routers/login';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(cors());
app.use(routerRegistre);
app.use(routerSchedules);
app.use(routerCancellation);
app.use(routerLogin);

export default app;
