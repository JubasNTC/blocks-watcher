'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Block, {
        foreignKey: 'blockId',
        as: 'block',
      });
    }
  }
  Transaction.init(
    {
      to: DataTypes.STRING,
      from: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );
  return Transaction;
};
