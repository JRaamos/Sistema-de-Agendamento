import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { Cancellation } from '../../types/Cancellation';
import UserModel from './user.model';

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
  dateCancellation: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'date_cancellation',
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
  eventId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'event_id',
  },
}, {
  tableName: 'cancellations',
  timestamps: false,
  underscored: true,
});

export default CancellationModel;