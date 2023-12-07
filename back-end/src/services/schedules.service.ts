import { Op } from 'sequelize';
import moment from 'moment-timezone';
import ScheduleModel, { ScheduleInputtableTypes } from '../database/models/schedules.model';
import ServiceModel from '../database/models/service.model';
import { Schedule, ScheduleAllUser } from '../types/schedules';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';

const now = moment.tz('America/Sao_Paulo');
const currentDate = now.format('YYYY-MM-DD');

const createSchedule = async (schedule: ScheduleInputtableTypes):
Promise<ServiceResponse<Schedule>> => {
  const { date, hour, userId, eventId } = schedule;
  const scheduleResult = await ScheduleModel.create({ date, hour, userId, eventId });
  if (!scheduleResult) {
    return {
      status: 'NOT_FOUND', data: { message: 'dados invalidos' },
    };
  }

  return { status: 'SUCCESSFUL', data: scheduleResult.dataValues as Schedule };
};

const finaAllSchedulesDate = async (date: string): Promise<ServiceResponse<ScheduleAllUser[]>> => {
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
  if (!schedulesWithServicesAndUsers) {
    return {
      status: 'NOT_FOUND', data: { message: 'Agendamento não encontrado' },
    };
  }
  
  return { status: 'SUCCESSFUL', 
    data: schedulesWithServicesAndUsers as unknown as ScheduleAllUser[],
  };
};

const findAllSchedulesFromNow = async (): Promise<ServiceResponse<ScheduleAllUser>> => {
  const currentTime = now.format('HH:mm:ss');

  const schedules = await ScheduleModel.findAll({
    where: {
      [Op.and]: [
        { date: { [Op.gt]: currentDate } },
        {
          [Op.or]: [{
            [Op.and]: [
              { date: currentDate },
              { hour: { [Op.gte]: currentTime } },
            ],
          },
          { date: { [Op.gt]: currentDate } },
          ],
        }],
    },
    include: [{
      model: ServiceModel,
      as: 'services',
      attributes: ['service', 'price', 'duration'],
      through: { attributes: [] },
    },
    {
      model: UserModel,
      as: 'user',
      attributes: ['name', 'phone', 'deviceId'],
    }],
    order: [['date', 'ASC'], ['hour', 'ASC'],
    ],
  });

  if (!schedules) {
    return {
      status: 'NOT_FOUND', data: { message: 'Agendamento não encontrado' },
    };
  }

  return { status: 'SUCCESSFUL', data: schedules as unknown as ScheduleAllUser };
};

const findByScheduleDateId = async (date: string, hour: string) => {
  const schedulesWithServices = await ScheduleModel.findOne({
    where: { date, hour },
    include: [{
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

  return schedulesWithServices;
};

const deleteSchedule = async (scheduleId: number) => {
  await ScheduleModel.destroy({ where: { scheduleId } });
};

const countSchedules = async (rangeDays: number) => {
  const endTime = now.format('HH:mm:ss');

  let startDate = now.clone().subtract(rangeDays, 'days').format('YYYY-MM-DD');

  if (rangeDays <= 0) {
    startDate = '1970-01-01';
  }

  const result = await ScheduleModel.count({
    where: {
      [Op.and]: [
        { date: { [Op.gte]: startDate } },
        { date: { [Op.lte]: currentDate } },
        {
          [Op.or]: [
            {
              date: {
                [Op.lt]: currentDate,
              },
            },
            {
              [Op.and]: [
                { date: currentDate },
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