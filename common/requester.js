const request = require('request-promise');
const Bottleneck = require('bottleneck');
const Utils = require('../utils');

// Symbols which are used for private fields / methods
const _requestSchedulersByKey = Symbol();
const _getRequestSchedulerByKey = Symbol();
const _generateRequestSchedulerKeyByUrl = Symbol();

class Requester {
	constructor() {
		this[_requestSchedulersByKey] = new Map();
	}

	[_getRequestSchedulerByKey](key) {
		let scheduler = this[_requestSchedulersByKey].get(key);

		if (!scheduler) {
			scheduler = new Bottleneck({
				minTime: 2000
			});

			this[_requestSchedulersByKey].set(key, scheduler);
		}

		return scheduler;
	}

	[_generateRequestSchedulerKeyByUrl](url) {
		const { protocol, host } = Utils.parseUrl(url);

		return `${protocol}://${host}`;
	}

	sendRequest(options) {
		const requestSchedulerKey = this[_generateRequestSchedulerKeyByUrl](options.url);
		const requestScheduler = this[_getRequestSchedulerByKey](requestSchedulerKey);

		return requestScheduler.schedule(() => request({
			...options,
			json: true,
			resolveWithFullResponse: true
		}))
	}
}

module.exports = new Requester();
