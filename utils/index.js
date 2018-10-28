const parse = require('url-parse');

/** Class representing different utils. */
class Utils {
	/**
	 * Replace paremeters in url.
	 * 
	 * Example:
	 * updateUrl('https://guesty-user-service.herokuapp.com/user/{userId}', {userId: 1})
	 * returns https://guesty-user-service.herokuapp.com/user/1
	 * 
	 * @param {string} url 
	 * @param {object} parameters
	 * @return {string} The updated url
	 */
	static updateUrl(url = '', parameters = {}) {
		Object.keys(parameters).forEach(parameter => {
			url = url.replace(new RegExp(`{${parameter}}`, 'g'), parameters[parameter])
		});

		return url;
	}

	/**
	 * Parse url.
	 * 
	 * The returned url instance contains the following properties:
	 * 
	 * protocol: The protocol scheme of the URL (e.g. http:).
	 * slashes: A boolean which indicates whether the protocol is followed by two forward slashes (//).
	 * auth: Authentication information portion (e.g. username:password).
	 * username: Username of basic authentication.
	 * password: Password of basic authentication.
	 * host: Host name with port number.
	 * hostname: Host name without port number.
	 * port: Optional port number.
	 * pathname: URL path.
	 * query: Parsed object containing query string, unless parsing is set to false.
	 * hash: The "fragment" portion of the URL including the pound-sign (#).
	 * href: The full URL.
	 * origin: The origin of the URL.
	 * 
	 * @param {string} url 
	 * @return {object}
	 */
	static parseUrl(url = '') {
		return parse(url);
	}
}

module.exports = Utils;
