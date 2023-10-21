import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { Service } from '../../types/Services';

export type ServiceInputtableTypes = Optional<Service, 'serviceId'>;
type ServiceSequelizeModelCreator = ModelDefined<Service, ServiceInputtableTypes>;
export type ServiceSequelizeModel = Model<Service, ServiceInputtableTypes>;

const ServiceModel: ServiceSequelizeModelCreator = db.define('Service', {
  serviceId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  services: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
}, {
  tableName: 'services',
  timestamps: false,
  underscored: true,

});

export default ServiceModel;