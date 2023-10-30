import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { BarberUser } from '../../types/BarberUser';

export type CancellationInputtableTypes = Optional<BarberUser, 'barberId'>;
type CancellationSequelizeModelCreator = ModelDefined<BarberUser, CancellationInputtableTypes>;
export type CancellationSequelizeModel = Model<BarberUser, CancellationInputtableTypes>;

const BarberUserModel: CancellationSequelizeModelCreator = db.define('BarberUser', {
  barberId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'barber_id',
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'barber_users',
  timestamps: false,
  underscored: true,
});

export default BarberUserModel;