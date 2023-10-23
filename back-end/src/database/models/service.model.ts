import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { Service } from '../../types/Services';
import ScheduleModel from './schedules.model';
import ScheduleServiceModel from './scheduleService.model';

export type ServiceInputtableTypes = Optional<Service, 'serviceId'>;
type ServiceSequelizeModelCreator = ModelDefined<Service, ServiceInputtableTypes>;
export type ServiceSequelizeModel = Model<Service, ServiceInputtableTypes>;

const ServiceModel: ServiceSequelizeModelCreator = db.define('Service', {
  serviceId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  service: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  
}, {
  tableName: 'services',
  timestamps: false,
  underscored: true,

});
ServiceModel.belongsToMany(ScheduleModel, {
  through: ScheduleServiceModel,
  foreignKey: 'service_id',
  otherKey: 'schedule_id',
});
export default ServiceModel;