'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Block extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Block.hasMany(models.Transaction, {
        foreignKey: 'blockId',
        as: 'transactions',
      });
    }
  }
  Block.init(
    {
      number: DataTypes.STRING,
      hash: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Block',
    }
  );
  return Block;
};
