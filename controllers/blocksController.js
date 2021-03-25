'use strict';

const { sequelize } = require('../models');
const { BALANCE_CHANGED_MOST_QUERY } = require('../constants');

module.exports = {
  getBalanceChangedMost: async (req, res) => {
    try {
      const [balance] = await sequelize.query(BALANCE_CHANGED_MOST_QUERY);
      return res.status(200).json(balance);
    } catch (error) {
      return res.status(500);
    }
  },
};
