import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { Cancellation } from '../../types/Cancellation';

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
  },
  dateSchedule: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hourSchedule: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'cancellations',
  timestamps: false,
  underscored: true,
});

export default CancellationModel;