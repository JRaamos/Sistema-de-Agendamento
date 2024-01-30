import express from 'express';
import cors from 'cors';
import routerRegistre from './routers/registres.routers';
import routerSchedules from './routers/schedules.router';
import routerCancellation from './routers/cancellation.routers';
import routerLogin from './routers/login';
import routerGoogleEvent from './routers/googleEvent.routers';
import routerDayOff from './routers/dayOff.routers';
import routerService from './routers/service.routers';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(routerService);
app.use(routerRegistre);
app.use(routerSchedules);
app.use(routerCancellation);
app.use(routerLogin);
app.use(routerGoogleEvent);
app.use(routerDayOff);

export default app;
