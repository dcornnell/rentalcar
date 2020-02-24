module.exports = function(sequelize, dataTypes) {
  const Car = sequelize.define("Car", {
    id: {
      type: dataTypes.INTEGER,

      primaryKey: true,
      autoIncrement: true
    },
    car_maker: {
      type: dataTypes.STRING,
      allowNull: false
    },
    car_model: {
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

  return Car;
};
