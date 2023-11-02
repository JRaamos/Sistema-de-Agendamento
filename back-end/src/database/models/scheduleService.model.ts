import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { ScheduleService } from '../../types/ScheduleServices';
import ScheduleModel from './schedules.model';
import ServiceModel from './service.model';

export type ScheduleServiceInputtableTypes = Optional<ScheduleService, 'id'>;

type ScheduleServiceSequelizeModelCreator = ModelDefined<
ScheduleService,
ScheduleServiceInputtableTypes
>;

export type ScheduleServiceSequelizeModel = Model<
ScheduleService,
ScheduleServiceInputtableTypes
>;

const ScheduleServiceModel: ScheduleServiceSequelizeModelCreator = db.define(
  'ScheduleService',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'service_id',
      references: {
        model: ServiceModel,
        key: 'service_id',
      },
    },
  },
  {
    tableName: 'schedule_services',
    timestamps: false,
    underscored: true,
  },
);
ScheduleModel.belongsToMany(ServiceModel, {
  through: ScheduleServiceModel,
  foreignKey: 'schedule_id',
  otherKey: 'service_id',
  as: 'services',
});

export default ScheduleServiceModel;
