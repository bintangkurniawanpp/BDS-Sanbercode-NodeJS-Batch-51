const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Venue.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false, //
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false, 
    }
  }, {
    sequelize,
    modelName: 'Venue',
  });
  return Venue;
};