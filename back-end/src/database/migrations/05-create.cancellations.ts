import { DataTypes, Model, QueryInterface } from "sequelize";
import { Cancellation } from "../../types/Cancellation";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Cancellation>>("cancellations", {
      cancellationId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "cancellation_id",
      },
      dateSchedule: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: "date_schedule",
      },
      dateCancellation: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: "date_cancellation",
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "user_id",
        references: {
          model: "users",
          key: "user_id",
        },
      },
      eventId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "event_id",
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("cancellations");
  },
};
