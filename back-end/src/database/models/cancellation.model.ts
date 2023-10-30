import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { Cancellation } from '../../types/Cancellation';
import UserModel from './user.model';
import ScheduleModel from './schedules.model';

export type CancellationInputtableTypes = Optional<Cancellation, 'cancellationId'>;
type CancellationSequelizeModelCreator = ModelDefined<Cancellation, CancellationInputtableTypes>;
export type CancellationSequelizeModel = Model<Cancellation, CancellationInputtableTypes>;

const CancellationModel: CancellationSequelizeModelCreator = db.define('Cancellation', {
  cancellationId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'cancellation_id',
  },
  scheduleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'schedule_id',
    references: {
      model: ScheduleModel,
      key: 'schedule_id',
    },

  },
  dateSchedule: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: UserModel,
      key: 'user_id',
    },
  },
}, {
  tableName: 'cancellations',
  timestamps: false,
  underscored: true,
});

export default CancellationModel;