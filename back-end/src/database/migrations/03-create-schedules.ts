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
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hour: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      eventId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'event_id',
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
  
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('schedules');
  }
};
