import axios from "axios";
import myCache from "./myCache.js";
import "dotenv/config";

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

	const responseToken = await axios.post(tokenUrl, tokenData, tokenConfig).catch((error) => {
		throw new Error("Token request error");
	});
	const token = responseToken.data.access_token;
	myCache.put("access_token", `Bearer ${token}`);

	return myCache.get("access_token");
};
export default getToken;
