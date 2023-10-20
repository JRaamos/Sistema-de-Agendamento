import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import { User } from '../../types/User';
import db from '.';

type UserInputtableTypes = Optional<User, 'userId'>;
type UserSequelizeModelCreator = ModelDefined<User, UserInputtableTypes>;
export type UserSequelizeModel = Model<User, UserInputtableTypes>;

const UserModel: UserSequelizeModelCreator = db.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,
  underscored: true,
});

export default UserModel;