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
        references: {
          model: 'users',
          key: 'userId',
        },
      },
      serviceId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'services',
          key: 'serviceId',
        },
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('schedules');
  }
};
