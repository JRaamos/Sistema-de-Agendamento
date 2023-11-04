import sequelize, { Op } from 'sequelize';
import ScheduleModel, { ScheduleInputtableTypes } from '../database/models/schedules.model';
import ServiceModel from '../database/models/service.model';
import { Schedule } from '../types/schedules';
import moment from 'moment-timezone';


const createSchedule = async (schedule: ScheduleInputtableTypes):
  Promise<Schedule> => {
  const { date, hour, userId, eventId } = schedule;

  const scheduleResult = await ScheduleModel.create({ date, hour, userId, eventId });
  return scheduleResult.dataValues as Schedule;
};

const finaAllSchedulesDate = async (date: string) => {
  const schedulesWithServices = await ScheduleModel.findAll({
    where: { date },
    include: {
      model: ServiceModel,
      as: 'services',
      attributes: ['service', 'price', 'duration'],
      through: { attributes: [] },
    },
  });

  return schedulesWithServices;
};

const findByScheduleDateId = async (date: string, hour: string) => {
  const schedulesWithServices = await ScheduleModel.findOne({
    where: { date, hour },
    include: {
      model: ServiceModel,
      as: 'services',
      attributes: ['service', 'price', 'duration'],
      through: { attributes: [] },
    },
  });

  return schedulesWithServices;
};

const deleteSchedule = async (scheduleId: number) => {
  await ScheduleModel.destroy({ where: { scheduleId } });
};

const countSchedules = async (rangeDays: number) => {
  const now = moment.tz('America/Sao_Paulo');
  const currentDate = now.format('YYYY-MM-DD');
  const currentTime = now.format('HH:mm:ss');
  let startDate;

  if (rangeDays > 0) {
    startDate = now.subtract(rangeDays, 'days').format('YYYY-MM-DD');
  } else {
    startDate = '1970-01-01'; 
  }

  const result = await ScheduleModel.count({
    where: {
      [Op.or]: [
        {
          date: {
            [Op.lt]: currentDate, 
          },
        },
        {
          [Op.and]: [
            { date: currentDate },
            { hour: { [Op.lte]: currentTime } }, 
          ],
        },
      ],
    },
  });

  return result;
};




const countFutureSchedules = async () => {
  const now = moment.tz('America/Sao_Paulo');
  const currentDate = now.format('YYYY-MM-DD');
  const currentTime = now.format('HH:mm:ss');

  const result = await ScheduleModel.count({
    where: {
      date: {
        [Op.gte]: currentDate,
      },
      [Op.or]: [
        {
          date: {
            [Op.gt]: currentDate,
          },
        },
        {
          [Op.and]: [
            { date: currentDate },
            { hour: { [Op.gt]: currentTime } },
          ],
        },
      ],
    },
  });

  return result;
};


export default {
  countFutureSchedules,
  createSchedule,
  finaAllSchedulesDate,
  findByScheduleDateId,
  deleteSchedule,
  countSchedules,
};