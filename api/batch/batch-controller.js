const Utils = require("../../utils");
const requestSheduler = require('../../common/request-scheduler');

class BatchController {
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
	
				return requestSheduler
					.sendRequest(options)
					// Retry one more time if the error has occurred
					.catch(() => requestSheduler.sendRequest(options))
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