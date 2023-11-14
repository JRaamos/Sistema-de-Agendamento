import { DataTypes, QueryInterface, Model } from "sequelize";
import { DayOffDb } from "../../types/DayOff";
import BarberUserModel from "../models/barberUser.model";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable('day_off', {
      dayOffId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'day_off_id',
      },
      barberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'barber_id',
      },
      dayOff: {
        type: DataTypes.DATEONLY, 
        allowNull: false,
        field: 'day_off',
      },
      time: {
        type: DataTypes.STRING(50),
        allowNull: false,

      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('day_off');
  }
}
