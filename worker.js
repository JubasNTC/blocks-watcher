'use strict';

require('dotenv').config();

const axios = require('axios');
const { Block, Transaction, sequelize } = require('./models');
const { incrementHex } = require('./helpers');
const { DEFAULT_BLOCK_NUMBER } = require('./constants');

(async () => {
  try {
    let lastBlockNumber = (await Block.max('number')) || DEFAULT_BLOCK_NUMBER;
    while (true) {
      const {
        data: { result },
      } = await axios.get(process.env.ETHERSCAN_API_URL, {
        params: {
          module: 'proxy',
          action: 'eth_getBlockByNumber',
          boolean: 'true',
          apikey: process.env.ETHERSCAN_API_KEY,
          tag: lastBlockNumber,
        },
      });

      if (!result) continue;

      const { number, hash, transactions } = result;

      const t = await sequelize.transaction();
      try {
        const {
          dataValues: { id },
        } = await Block.create({ number, hash }, { transaction: t });
        const processedTransactions = transactions.map(
          ({ from, to, value }) => ({
            blockId: id,
            from,
            to,
            value,
          })
        );
        await Transaction.bulkCreate(processedTransactions, { transaction: t });
        await t.commit();

        lastBlockNumber = incrementHex(lastBlockNumber);
      } catch (e) {
        await t.rollback();
        console.error(e);
        process.exit(1);
      }
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
