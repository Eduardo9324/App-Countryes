const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      difficulty: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        validate: {
          isEven(value) {
            if (value < 1 || value > 5) {
              throw new Error("Invalid difficulty");
            }
          },
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 24,
          isEven(value) {
            if (value < 1 || value > 24) {
              throw new Error("Invalid duration");
            }
          },
        },
      },
      season: {
        type: DataTypes.ENUM("summer", "fall", "winter", "spring"),
        /* validate: {
          isEven(value) {
            if (
              value != "summer" ||
              value != "fall" ||
              value != "winter" ||
              value != "spring"
            ) {
              throw new Error("Invalid value");
            }
          }
        } */
      },
      /* esta propiedad me permite distinguir los elementos de mi base de datos de los de la API */
      createInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
    },
    {
      timestamps: false,
    }
  );};