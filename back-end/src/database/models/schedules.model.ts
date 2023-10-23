import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { Schedule } from '../../types/schedules';
import  ServiceModel  from './service.model'

export type ScheduleInputtableTypes = Optional<Schedule, 'scheduleId'>;
type ScheduleSequelizeModelCreator = ModelDefined<Schedule, ScheduleInputtableTypes>;
export type ScheduleSequelizeModel = Model<Schedule, ScheduleInputtableTypes>;

const ScheduleModel: ScheduleSequelizeModelCreator = db.define('Schedule', {
  scheduleId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'schedule_id',
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hour: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'schedules',
  timestamps: false,
  underscored: true,
});


ScheduleModel.belongsToMany(ServiceModel, {
  through: 'ScheduleServices', 
  foreignKey: 'schedule_id',
});

export default ScheduleModel;
