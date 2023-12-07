import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { Schedule } from '../../types/schedules';
import UserModel from './user.model';

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
  eventId: {
    type: DataTypes.STRING(128),
    allowNull: false,
    field: 'event_id',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: 'user_id',
    },
  },
}, {
  tableName: 'schedules',
  timestamps: false,
  underscored: true,
});

ScheduleModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
UserModel.hasMany(ScheduleModel, { foreignKey: 'userId', as: 'schedules' });

export default ScheduleModel;
