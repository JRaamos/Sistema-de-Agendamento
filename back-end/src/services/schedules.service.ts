import  { Op } from 'sequelize';
import ScheduleModel, { ScheduleInputtableTypes } from '../database/models/schedules.model';
import ServiceModel from '../database/models/service.model';
import { Schedule, ScheduleAllUser } from '../types/schedules';
import moment from 'moment-timezone';
import UserModel from '../database/models/user.model';

const createSchedule = async (schedule: ScheduleInputtableTypes):
  Promise<Schedule> => {
  const { date, hour, userId, eventId } = schedule;

  const scheduleResult = await ScheduleModel.create({ date, hour, userId, eventId });
  return scheduleResult.dataValues as Schedule;
};

const finaAllSchedulesDate = async (date: string): Promise<ScheduleAllUser[]> => {
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
        attributes: ['name', 'phone', 'deviceId'],
      },
    ],
  });

  return schedulesWithServicesAndUsers as unknown as ScheduleAllUser[];
};

const findAllSchedulesFromNow = async () => {
  const now = moment.tz('America/Sao_Paulo');
  const currentDate = now.format('YYYY-MM-DD');
  const currentTime = now.format('HH:mm:ss');

  const schedules = await ScheduleModel.findAll({
    where: {
      [Op.and]: [
        { date: { [Op.gt]: currentDate } },
        {
          [Op.or]: [
            {
              [Op.and]: [
                { date: currentDate },
                { hour: { [Op.gte]: currentTime } },
              ],
            },
            { date: { [Op.gt]: currentDate }, },
          ],
        },
      ],
    },
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
        attributes: ['name', 'phone', 'deviceId'],
      },
    ],
    order: [
      ['date', 'ASC'],
      ['hour', 'ASC'], 
    ],
  });

  return schedules;
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
        { date: { [Op.gte]: startDate } },
        { date: { [Op.lte]: endDate } },
        {
          [Op.or]: [
            {
              date: {
                [Op.lt]: endDate,
              },
            },
            {
              [Op.and]: [
                { date: endDate },
                { hour: { [Op.lte]: endTime } },
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
  findAllSchedulesFromNow,
};