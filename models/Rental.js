module.exports = function(sequelize, dataTypes) {
  const Rental = sequelize.define("Rental", {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    miles: {
      type: dataTypes.INTEGER(10),
      allowNull: false
    },
    days: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: dataTypes.FLOAT(10, 2)
    },
    total_price: {
      type: dataTypes.FLOAT(10, 2)
    },
    vat_price: {
      type: dataTypes.FLOAT(10, 2)
    },
    start_date: {
      type: dataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: dataTypes.DATE,
      allowNull: false
    }
  });

  Rental.associate = function(models) {
    Rental.belongsTo(models.Car, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Rental;
};
