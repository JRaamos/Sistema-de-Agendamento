import cron from 'node-cron';
import * as dotenv from 'dotenv';
import app from './app';
import { checkForUpcomingAppointments } from './utils/corn-node';

dotenv.config();

// import sendDailyNotifications from './utils/corn-node';

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT}`,
));
cron.schedule('*/10 6-19 * * *', () => {
  checkForUpcomingAppointments();
  console.log('Verificando novos agendamentos a cada 10 minutos durante o dia...');
}, {
  timezone: 'America/Sao_Paulo',
});

export default server;
