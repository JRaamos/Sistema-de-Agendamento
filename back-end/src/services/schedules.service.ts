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

const countSchedules = async (rageDays: number) => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  let dateStart = new Date();

  if (rageDays > 0) {
    dateStart.setDate(currentDate.getDate() - rageDays);
  } else {
    dateStart = new Date('1970-01-01');
  }

  dateStart.setHours(0, 0, 0, 0);

  const result = await ScheduleModel.count({
    where: {
      date: {
        [sequelize.Op.between]: [dateStart, currentDate],
      },
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