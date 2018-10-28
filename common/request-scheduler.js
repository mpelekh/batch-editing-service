const request = require('request-promise');

class RequestScheduler {
	sendRequest(options) {
		return request({
			...options,
			json: true,
			resolveWithFullResponse: true
		});
	}
}

module.exports = new RequestScheduler();
