import { DataTypes, Model, QueryInterface } from 'sequelize';
import { Service } from '../../types/Services'

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Service>>('services', {
      serviceId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'service_id',
      },
      service: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('services');
  }
};
