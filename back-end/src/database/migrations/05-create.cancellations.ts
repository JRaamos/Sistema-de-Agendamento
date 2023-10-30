import { DataTypes, Model, QueryInterface } from "sequelize";
import { Cancellation } from "../../types/Cancellation";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Cancellation>>('cancellations', {
      cancellationId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'cancellation_id'
      },
      scheduleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: 'schedule_id',
        references: {
          model: 'schedules',
          key: 'schedule_id'
        }
      },
      dateSchedule: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'date_schedule'
      },
      hourSchedule: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'hour_schedule'
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'user_id'
        }
      }
    })
  }, 
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('cancellations');
  }
}