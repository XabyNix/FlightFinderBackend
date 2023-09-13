import axios from "axios";
import "dotenv/config";
import myCache from "./myCache.js";
import getToken from "./getToken.js";
import rateLimit from "axios-rate-limit";

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
		const res = await axiosRateLimit.get(url, config).catch(async (err) => {
			if (
				(err.response.data.errors[0].code === 38191) |
				(err.response.data.errors[0].code === 38192)
			) {
				config.headers.Authorization = await getToken();

				return makeRequest();
			} else if (err.response.data.errors[0].code === 1797) {
				return null;
			} else {
				throw err.response.data.errors[0];
			}
		});
		return res;
	}
	return makeRequest();
};

export default fetchApi;
