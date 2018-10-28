class Utils {
	static updateUrl(url = '', parameters = {}) {
		Object.keys(parameters).forEach(parameter => {
			url = url.replace(new RegExp(`{${parameter}}`, 'g'), parameters[parameter])
		});

		return url;
	}
}

module.exports = Utils;
