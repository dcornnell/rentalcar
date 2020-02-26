module.exports = function(sequelize, dataTypes) {
  const Car = sequelize.define("Car", {
    id: {
      type: dataTypes.INTEGER,

      primaryKey: true,
      autoIncrement: true
    },
    make: {
      type: dataTypes.STRING,
      allowNull: false
    },
    model: {
      type: dataTypes.STRING,
      allowNull: false
    },
    year: {
      type: dataTypes.INTEGER(4),
      allowNull: false
    },
    seats: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: dataTypes.FLOAT(5, 2)
    },
    start_date: {
      type: dataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: dataTypes.DATE,
      allowNull: false
    },
    rented: {
      type: dataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Car.associate = function(models) {
    Car.hasMany(models.Rental, {
      onDelete: "cascade"
    });
  };

  return Car;
};
