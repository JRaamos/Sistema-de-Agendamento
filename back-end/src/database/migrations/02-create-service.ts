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
      services: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      price: {
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
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('services');
  }
};
