import sequelize, { Op } from 'sequelize';
import ScheduleModel, { ScheduleInputtableTypes } from '../database/models/schedules.model';
import ServiceModel from '../database/models/service.model';
import { Schedule } from '../types/schedules';
import moment from 'moment-timezone';
import userService from './user.service';
import UserModel from '../database/models/user.model';

const createSchedule = async (schedule: ScheduleInputtableTypes):
  Promise<Schedule> => {
  const { date, hour, userId, eventId } = schedule;

  const scheduleResult = await ScheduleModel.create({ date, hour, userId, eventId });
  return scheduleResult.dataValues as Schedule;
};

const finaAllSchedulesDate = async (date: string) => {
  const schedulesWithServicesAndUsers = await ScheduleModel.findAll({
    where: { date },
    include: [
      {
        model: ServiceModel,
        as: 'services',
        attributes: ['service', 'price', 'duration'],
        through: { attributes: [] },
      },
      {
        model: UserModel, 
        as: 'user',
        attributes: ['name', 'phone'], 
      },
    ],
  });

  return schedulesWithServicesAndUsers; 
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
  const endDate = now.format('YYYY-MM-DD');
  const endTime = now.format('HH:mm:ss');

  let startDate = now.clone().subtract(rangeDays, 'days').format('YYYY-MM-DD');
  

  if (rangeDays <= 0) {
    startDate = "1970-01-01"; 
  }

  const result = await ScheduleModel.count({
    where: {
      [Op.and]: [
        { date: { [Op.gte]: startDate } }, // Data igual ou posterior a 'startDate'.
        { date: { [Op.lte]: endDate } },   // Data igual ou anterior a 'endDate'.
        {
          [Op.or]: [
            {
              date: {
                [Op.lt]: endDate, // Data anterior a 'endDate'.
              },
            },
            {
              [Op.and]: [
                { date: endDate },
                { hour: { [Op.lte]: endTime } }, // Hora menor ou igual a 'endTime' se for o mesmo 'endDate'.
              ],
            },
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