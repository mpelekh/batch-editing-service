const request = require('request-promise');
const Bottleneck = require('bottleneck');
const config = require('../config');
const Utils = require('../utils');

// Symbols which are used for private fields / methods
const _requestSchedulersByKey = Symbol();
const _getRequestSchedulerByKey = Symbol();
const _generateRequestSchedulerKeyByUrl = Symbol();

/** Class representing a request. */
class Requester {
	/**
	 * Create a requester.
	 */
	constructor() {
		this[_requestSchedulersByKey] = new Map();
	}

	/**
	 * Get a request scheduler instance by key (create if not exists).
	 * 
	 * @param {string} key
	 * @return {object} The request scheduler
	 */
	[_getRequestSchedulerByKey](key) {
		let scheduler = this[_requestSchedulersByKey].get(key);

		if (!scheduler) {
			// The Bootleneck instance is used as a request scheduler
			// since it has the ability to define min time how long to wait after launching a job before launching another one.
			// In our case job is a HTTP request.
			scheduler = new Bottleneck({
				minTime: config.minTimePerRequest
			});

			this[_requestSchedulersByKey].set(key, scheduler);
		}

		return scheduler;
	}

	/**
	 * Generate a request scheduler key by url.
	 * 
	 * @param {string} url. Example: https://guesty-user-service.herokuapp.com/user/1
	 * @return {string} key. Example https://guesty-user-service.herokuapp.com
	 */
	[_generateRequestSchedulerKeyByUrl](url) {
		const { protocol, host } = Utils.parseUrl(url);

		return `${protocol}://${host}`;
	}

	/**
	 * Schedule the request and send when it's possible.
	 * 
	 * @param {object} options
	 * @return {promise} response
	 */
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
