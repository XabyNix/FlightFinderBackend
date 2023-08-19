import axios from "axios";

const getToken = async () => {
	const tokenUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

	const tokenConfig = {
		headers: {
			"content-type": "application/x-www-form-urlencoded",
		},
	};
	const tokenData = {
		grant_type: "client_credentials",
		client_id: "qrTAOb11DZByaLjIrUZB1owjtkR4hMm0",
		client_secret: "osW3PaL9p7hmI6O3",
	};

	const token = await axios.post(tokenUrl, tokenData, tokenConfig);
	console.log("Il_token" + token.data.access_token);
	return "Bearer " + token.data.access_token;
};

const fetchApi = async (url) => {
	const token = await getToken();
	const config = {
		headers: {
			Authorization: "Bearer " + token,
		},
	};
	return await axios.get(url, config);
};

export default fetchApi;
