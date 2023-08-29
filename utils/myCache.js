const myCache = {};

export default {
	put: function (key, value) {
		myCache[key] = value;
	},
	get: function (key) {
		return myCache[key];
	},
};
