import { DataTypes, Model, QueryInterface } from "sequelize";
import { ScheduleService } from "../../types/ScheduleServices";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ScheduleService>>('schedule_services', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      scheduleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: 'schedule_id',
        references: {
          model: 'schedules',
          key: 'schedule_id',
        },
        onDelete: 'CASCADE',
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
      
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('schedule_services');
  }
}