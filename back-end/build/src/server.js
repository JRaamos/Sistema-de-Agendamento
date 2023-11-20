"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const node_cron_1 = __importDefault(require("node-cron"));
const corn_node_1 = require("./utils/corn-node");
// import sendDailyNotifications from './utils/corn-node';
const PORT = process.env.PORT || 3001;
const server = app_1.default.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
node_cron_1.default.schedule('*/10 6-19 * * *', () => {
    (0, corn_node_1.checkForUpcomingAppointments)();
    console.log('Verificando novos agendamentos a cada 10 minutos durante o dia...');
}, {
    timezone: "America/Sao_Paulo"
});
exports.default = server;
