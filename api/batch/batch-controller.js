const Utils = require("../../utils");
const requester = require('../../common/requester');

/** Class representing a controller for /batch route. */
class BatchController {
	
	/**
	 * Handler for POST methods
	 * 
	 * @param {object} req 
	 * @param {object} res 
	 * @param {Function} next 
	 */
	static async postHandler(req, res, next) {
		const { body: { endpoint, payloads, requestBody: commonRequestBody = {} } } = req;

		try {
			const responses = await Promise.all(payloads.map(({ parameters, requestBody = {} }) => {
				const url = Utils.updateUrl(endpoint.url, parameters);
				const options = {
					method: endpoint.verb,
					url,
					body: {
						...commonRequestBody,
						...requestBody
					}
				};

				return requester
					.sendRequest(options)
					// Retry one more time if the error has occurred
					.catch(() => requester.sendRequest(options))
					.then(response => {
						return {
							url,
							verb: endpoint.verb,
							status: response.statusCode,
							responseBody: response.body
						};
					})
					.catch(error => {
						return {
							url,
							verb: endpoint.verb,
							status: error.statusCode,
							requestBody: options.body
						};
					});
			}));

			res.json(responses);
		} catch (error) {
			next(error);
		}
	}

}

module.exports = BatchController;
