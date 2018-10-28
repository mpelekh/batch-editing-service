const parse = require('url-parse');

class Utils {
	static updateUrl(url = '', parameters = {}) {
		Object.keys(parameters).forEach(parameter => {
			url = url.replace(new RegExp(`{${parameter}}`, 'g'), parameters[parameter])
		});

		return url;
	}

	static parseUrl(url = '') {
		return parse(url);
	}
}

module.exports = Utils;
