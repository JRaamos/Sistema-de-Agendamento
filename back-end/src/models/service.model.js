module.exports = (sequelize, DataTypes) => {
    const BarberService = sequelize.define('BarberService', {
        id: { 
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        services: DataTypes.STRING,
        price: DataTypes.DECIMAL(10,2),
        duration: DataTypes.INTEGER,
    },
    {
        tableName: 'barber_services',
        timestamps: false,
        underscored: true,
    });
  
    return BarberService;
};