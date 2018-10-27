const express = require('express');
const router = express.Router();
const createValidator = require('../common/create-validator');
const { batchRequest } = require('../api/batch/batch-schema');

router.post('/', createValidator(batchRequest), function (req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;
