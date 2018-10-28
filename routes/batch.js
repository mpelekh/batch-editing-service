const express = require('express');
const router = express.Router();
const createValidator = require('../common/create-validator');
const BatchController = require('../api/batch/batch-controller');
const { batchRequest } = require('../api/batch/batch-schema');

router.post('/', createValidator(batchRequest), BatchController.postHandler);

module.exports = router;
