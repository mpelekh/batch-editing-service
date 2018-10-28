const Joi = require('joi');

/** Schema of a buth request. */
const batchRequest = {
	body: {
		endpoint: {
			verb: Joi.string().required(),
			url: Joi.string().required()
		},
		payloads: Joi.array().required(),
		requestBody: Joi.object(),
	}
}

module.exports = {
	batchRequest
};