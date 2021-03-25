'use strict';

const express = require('express');
const { getBalanceChangedMost } = require('../controllers/blocksController');

const router = express.Router();

router.get('/balance-changed-most', getBalanceChangedMost);

module.exports = router;
