"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const service_service_1 = __importDefault(require("../services/service.service"));
const timeZone = 'America/Sao_Paulo';
const calcTotalTime = async (services) => {
    const { data, status } = await service_service_1.default.getAllService();
    if (status === 'NOT_FOUND') {
        return 0;
    }
    const servicesTime = Array.isArray(data) ? data.filter((service) => services.includes(service.dataValues.service))
        .map((service) => service.dataValues.duration) : [];
    return servicesTime.reduce((acc, curr) => acc + curr, 0);
};
const transformToGoogleEvent = async (data) => {
    const [month, day, year] = data.date.split('/');
    const formattedDate = `${year}-${month}-${day}T${data.hour}:00`;
    const startTime = moment_timezone_1.default.tz(formattedDate, timeZone).format();
    const totalTime = await calcTotalTime(data.services);
    const endTime = moment_timezone_1.default.tz(startTime, timeZone).add(totalTime, 'minutes').format();
    return {
        summary: `Agendamento de ${data.name}`,
        location: 'Stylus Barbearia',
        description: `Serviços: ${data.services.join(', ')}. Contato: ${data.phone}`,
        start: { dateTime: startTime, timeZone },
        end: {
            dateTime: endTime, timeZone,
        },
    };
};
exports.default = transformToGoogleEvent;
