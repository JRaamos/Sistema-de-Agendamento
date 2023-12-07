import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';

import { DayOffDb } from '../../types/DayOff';

export type DayOffCreationAttributes = Optional<DayOffDb, 'dayOffId'>;

type DayOffSequelizeModelCreator = ModelDefined<DayOffDb, DayOffCreationAttributes>;

export type DayOffSequelizeModel = Model<DayOffDb, DayOffCreationAttributes>;

const DayOffModel: DayOffSequelizeModelCreator = db.define('DayOff', {
  dayOffId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    field: 'day_off_id',
  },
  barberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'barber_id',
  },
  dayOff: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'day_off',
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'day_off',
  timestamps: false,
  underscored: true,
});

export default DayOffModel;
