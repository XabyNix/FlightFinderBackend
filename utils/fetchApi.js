import axios from "axios";
import "dotenv/config";
import myCache from "./myCache.js";
import getToken from "./getToken.js";

const fetchApi = async (url) => {
	let config = {
		headers: {
			Authorization: myCache.get("access_token"),
		},
	};
	const res = await axios.get(url, config).catch(async (noToken) => {
		//console.log(noToken);
		if (noToken.response.data.errors[0].code === 38191) {
			config.headers.Authorization = await getToken();
			const sureResponse = await axios.get(url, config).catch((error) => {
				throw new Error("Fetching api data error");
			});
			return sureResponse;
		}
	});
	return res;
};

export default fetchApi;
