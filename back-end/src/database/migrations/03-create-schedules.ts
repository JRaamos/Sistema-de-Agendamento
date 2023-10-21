import { DataTypes, Model, QueryInterface } from 'sequelize';
import { Schedule } from '../../types/schedules'

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Schedule>>('schedules', {
      scheduleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'schedule_id',
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      hour: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'user_id',
        },
      },
      serviceId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: 'service_id',
        references: {
          model: 'services',
          key: 'service_id',
        },
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('schedules');
  }
};