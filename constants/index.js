'use strict';

const DEFAULT_BLOCK_NUMBER = '963075'; // block 9842805 in hex
const BALANCE_CHANGED_MOST_QUERY = `
  SELECT t."to" as beneficiary, t."value"
  FROM public."Transactions" AS t
  INNER JOIN (
  SELECT id FROM public."Blocks"
    ORDER BY number DESC LIMIT 100
  ) AS lb ON lb."id" = t."blockId"
  ORDER BY  t."value" DESC LIMIT 1;
`;

module.exports = {
  BALANCE_CHANGED_MOST_QUERY,
  DEFAULT_BLOCK_NUMBER,
};
