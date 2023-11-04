import { DataTypes, QueryInterface, Model } from "sequelize";
import { DayOffDb } from "../../types/DayOff";
import BarberUserModel from "../models/barberUser.model";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<DayOffDb>>('day_off', {
     dayOffId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      barberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dayOff: {
        type: DataTypes.STRING(50),
        field: 'day_off',
      },
      time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  })
},
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('day_off');
  }
}
