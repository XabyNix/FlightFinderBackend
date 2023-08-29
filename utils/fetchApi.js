import axios from "axios";
import "dotenv/config";
import myCache from "./myCache.js";

const getToken = async () => {
	const tokenUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

	const tokenConfig = {
		headers: {
			"content-type": "application/x-www-form-urlencoded",
		},
	};
	const tokenData = {
		grant_type: "client_credentials",
		client_id: process.env.AMADEUS_CLIENT_ID,
		client_secret: process.env.AMADEUS_CLIENT_SECRET,
	};

	const tokenResponse = await axios.post(tokenUrl, tokenData, tokenConfig);
	const token = tokenResponse.data.access_token;

	myCache.put("access_token", `Bearer ${token}`);
	return myCache.get("access_token");
};

const fetchApi = async (url) => {
	try {
		const config = {
			headers: {
				Authorization: myCache.get("access_token"),
			},
		};
		return await axios.get(url, config);
	} catch (error) {
		if (error.response.data.errors[0].code === 38191) {
			const config = {
				headers: {
					Authorization: await getToken(),
				},
			};
			return await axios.get(url, config);
		}
	}
};

export default fetchApi;
