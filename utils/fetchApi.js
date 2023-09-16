import axios from "axios";
import myCache from "./myCache.js";
import getToken from "./getToken.js";
import rateLimit from "axios-rate-limit";
import "dotenv/config";

const axiosRateLimit = rateLimit(axios.create(), {
	maxRequests: 1,
	perMilliseconds: 1000,
	maxRPS: 1,
});

const fetchApi = async (url) => {
	let config = {
		headers: {
			Authorization: myCache.get("access_token"),
		},
	};

	async function makeRequest() {
		const res = await axios.get(url, config).catch(async (err) => {
			switch (err.response.data.errors[0].code) {
				case 38191 || 38192:
					config.headers.Authorization = await getToken();
					return makeRequest();

				case 38194:
					setTimeout(() => {
						makeRequest();
					}, 500);
					break;
				case 1797:
					return null;

				default:
					throw err.response.data.errors[0];
			}
		});
		return res;
	}
	return makeRequest();
};

export default fetchApi;
