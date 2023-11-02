import { DataTypes, QueryInterface, Model } from "sequelize";
import { BarberUser} from "../../types/BarberUser";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<BarberUser>>('barber_users', {
      barberId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'barber_id',
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('barber_users');
  }
}